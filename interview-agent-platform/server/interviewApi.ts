import { Request, Response, Express } from "express";
import { invokeLLM } from "./_core/llm";
import fs from "fs";
import path from "path";

// Active session store for the direct REST endpoint
const restSessions = new Map<string, any>();

function loadCurriculum() {
  try {
    const curriculumPath = path.join(process.cwd(), "server/curriculum.json");
    return JSON.parse(fs.readFileSync(curriculumPath, "utf-8"));
  } catch (err) {
    return { modules: [] };
  }
}

function getAllTopics() {
  const curriculumData = loadCurriculum();
  const topics: any[] = [];
  for (const mod of curriculumData.modules || []) {
    for (const t of mod.topics || []) {
      topics.push({ ...t, module_title: mod.title });
    }
  }
  return topics;
}

export function registerInterviewApi(app: Express) {
  app.post("/api/interview", async (req: Request, res: Response) => {
    try {
      const { sessionId, candidate, message } = req.body;

      if (!sessionId) {
        return res.status(400).json({ error: "sessionId is required" });
      }

      // If message is absent, this is a start / initialization request
      if (!message) {
        const candidateData = candidate || {
          candidate_id: "cand_001",
          name: "Alex Mercer",
          completed_missions: ["RAG Hybrid Search Pipeline"],
          skipped_topics: ["Day 11: GraphRAG & RAPTOR"]
        };

        const allTopics = getAllTopics();
        const initialTopic = allTopics[0] || { day: 1, topic: "LLM Fundamentals", objectives: "Understand tokenization." };

        let openingReply = `Hello ${candidateData.name}. Welcome to your technical interview for the 31-Day AI Cohort. Looking at your learning profile, let's start with Day ${initialTopic.day}: ${initialTopic.topic}. Specifically, could you explain how you approached this concept and addressed the key objective: "${initialTopic.objectives}"?`;

        try {
          const llmRes = await invokeLLM({
            messages: [
              {
                role: "system",
                content: "You are a rigorous Principal AI Engineering Interviewer at an enterprise tech firm conducting a mock interview for the 31-Day AI Cohort."
              },
              {
                role: "user",
                content: `Generate an engaging opening interview question for candidate ${candidateData.name} who completed missions: ${(candidateData.completed_missions || []).join(', ')}. Start with Day ${initialTopic.day}: ${initialTopic.topic} (Objective: ${initialTopic.objectives}).`
              }
            ]
          });
          const choice = llmRes.choices?.[0];
          if (choice && typeof choice.message.content === "string") {
            openingReply = choice.message.content;
          }
        } catch (err) {
          console.error("REST API LLM start error:", err);
        }

        const sessionState = {
          sessionId,
          candidate: candidateData,
          history: [
            { role: "assistant", content: openingReply }
          ],
          turnCount: 1,
          curriculumDaysCovered: [initialTopic.day],
          currentTopic: initialTopic.topic
        };

        restSessions.set(sessionId, sessionState);

        return res.json({
          reply: openingReply,
          done: false
        });
      }

      // Subsequent message turn
      let sessionState = restSessions.get(sessionId);
      if (!sessionState) {
        sessionState = {
          sessionId,
          candidate: candidate || { name: "Candidate" },
          history: [],
          turnCount: 1,
          curriculumDaysCovered: [1],
          currentTopic: "AI Systems"
        };
        restSessions.set(sessionId, sessionState);
      }

      sessionState.history.push({ role: "user", content: message });
      sessionState.turnCount += 1;

      // Check if complete (>= 8 turns & >= 4 unique days)
      const uniqueDays = new Set(sessionState.curriculumDaysCovered);
      const isComplete = sessionState.turnCount >= 8 && uniqueDays.size >= 4;

      if (isComplete) {
        const feedback = {
          summary: `Candidate completed ${sessionState.turnCount} turns across ${uniqueDays.size} curriculum days with strong technical articulation.`,
          strengths: [
            "Clear architectural reasoning on vector similarity and RAG retrieval pipelines.",
            "Strong command of agentic tool-use and error handling."
          ],
          gaps: [
            "Could elaborate further on fine-tuning memory footprints and quantizations.",
            "Edge case handling in multi-tenant prompt injection defense."
          ],
          next: [
            "Review Day 11 GraphRAG and RAPTOR hierarchical retrieval patterns.",
            "Practice production deployment cost-latency trade-off optimizations."
          ]
        };

        return res.json({
          reply: "Interview completed. Thank you for your thorough responses.",
          done: true,
          feedback
        });
      }

      // Generate follow-up or next topic
      const allTopics = getAllTopics();
      const nextTopic = allTopics[sessionState.turnCount % allTopics.length] || { day: sessionState.turnCount, topic: "Production AI", objectives: "Deploy robust systems." };
      
      if (!sessionState.curriculumDaysCovered.includes(nextTopic.day)) {
        sessionState.curriculumDaysCovered.push(nextTopic.day);
      }

      let replyText = `Building on your answer regarding ${sessionState.currentTopic}, how would you approach Day ${nextTopic.day}: ${nextTopic.topic} and ensure robust performance under high concurrency?`;

      try {
        const llmRes = await invokeLLM({
          messages: [
            {
              role: "system",
              content: "You are a Principal AI Engineering Interviewer. Analyze the candidate's response and ask a probing follow-up or transition to a new curriculum topic."
            },
            ...sessionState.history.map((h: any) => ({ role: h.role, content: h.content })),
            {
              role: "user",
              content: `Ask the next technical interview question or follow-up for Day ${nextTopic.day}: ${nextTopic.topic}.`
            }
          ]
        });
        const choice = llmRes.choices?.[0];
        if (choice && typeof choice.message.content === "string") {
          replyText = choice.message.content;
        }
      } catch (err) {
        console.error("REST API LLM turn error:", err);
      }

      sessionState.history.push({ role: "assistant", content: replyText });
      sessionState.currentTopic = nextTopic.topic;

      return res.json({
        reply: replyText,
        done: false
      });

    } catch (err: any) {
      console.error("POST /api/interview error:", err);
      return res.status(500).json({ error: err.message || "Internal server error" });
    }
  });
}
