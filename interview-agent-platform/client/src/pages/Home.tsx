import React, { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { Streamdown } from "streamdown";
import { AIChatBox } from "@/components/AIChatBox";

export default function Home() {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isInterviewActive, setIsInterviewActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [feedbackReport, setFeedbackReport] = useState<any>(null);

  // Fetch candidates
  const { data: candidates, isLoading: candidatesLoading } = trpc.interview.getCandidates.useQuery();

  // Start interview mutation
  const startMutation = trpc.interview.startSession.useMutation({
    onSuccess: (data) => {
      setSessionId(data.sessionId);
      setIsInterviewActive(true);
    }
  });

  // Status query for live progress
  const { data: sessionStatus, refetch: refetchStatus } = trpc.interview.getStatus.useQuery(
    { sessionId: sessionId || "" },
    { enabled: !!sessionId && isInterviewActive }
  );

  // Respond mutation
  const respondMutation = trpc.interview.respondSession.useMutation({
    onSuccess: () => {
      refetchStatus();
    }
  });

  // Conclude interview mutation
  const concludeMutation = trpc.interview.concludeSession.useMutation({
    onSuccess: (data) => {
      setFeedbackReport(data);
      setIsCompleted(true);
      setIsInterviewActive(false);
    }
  });

  const handleStartInterview = (candidateId: string) => {
    setSelectedCandidateId(candidateId);
    startMutation.mutate({ candidateId });
  };

  if (candidatesLoading) {
    return (
      <div className="min-h-screen blueprint-grid flex items-center justify-center">
        <div className="text-center font-mono-tech text-sky-600 animate-pulse text-lg">
          [INITIALIZING INTERVIEW AGENT TELEMETRY...]
        </div>
      </div>
    );
  }

  // Feedback View
  if (isCompleted && feedbackReport) {
    return (
      <div className="min-h-screen blueprint-grid p-6 lg:p-12 text-slate-900">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="border-b border-slate-300 pb-6 flex items-center justify-between">
            <div>
              <span className="font-mono-tech text-xs tracking-widest text-sky-600 uppercase">Evaluation Report // 31-Day AI Cohort</span>
              <h1 className="text-4xl font-extrabold tracking-tight mt-1">The Interview Agent Assessment</h1>
            </div>
            <Badge className="bg-emerald-600 text-white font-mono-tech px-4 py-1.5 text-sm">
              {feedbackReport.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-slate-300 bg-white/80 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-mono-tech text-slate-500 uppercase">Candidate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{feedbackReport.candidateName}</div>
                <div className="text-xs text-slate-500 font-mono-tech mt-1">{feedbackReport.role}</div>
              </CardContent>
            </Card>

            <Card className="border border-slate-300 bg-white/80 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-mono-tech text-slate-500 uppercase">Curriculum Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold text-sky-600 font-mono-tech">{feedbackReport.curriculumDaysCovered.length} Days</div>
                <div className="text-xs text-slate-500 font-mono-tech mt-1">Target: ≥ 4 distinct days (Met)</div>
              </CardContent>
            </Card>

            <Card className="border border-slate-300 bg-white/80 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-mono-tech text-slate-500 uppercase">Overall Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold text-emerald-600 font-mono-tech">{feedbackReport.overallScore} / 100</div>
                <div className="text-xs text-slate-500 font-mono-tech mt-1">Total Turns: {feedbackReport.totalTurns}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-slate-300 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Demonstrated Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {feedbackReport.strengths?.map((str: string, i: number) => (
                  <div key={i} className="text-sm text-slate-700 flex items-start gap-2">
                    <span className="font-mono-tech text-emerald-600">[{i+1}]</span>
                    <span>{str}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-slate-300 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {feedbackReport.areasForImprovement?.map((area: string, i: number) => (
                  <div key={i} className="text-sm text-slate-700 flex items-start gap-2">
                    <span className="font-mono-tech text-amber-600">[{i+1}]</span>
                    <span>{area}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="border border-slate-300 bg-slate-900 text-white shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-mono-tech text-sky-400">Actionable Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {feedbackReport.actionableRecommendations?.map((rec: string, i: number) => (
                <div key={i} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="font-mono-tech text-sky-400">►</span>
                  <span>{rec}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter className="pt-4 border-t border-slate-800 flex justify-between">
              <span className="font-mono-tech text-xs text-slate-400">Session ID: {sessionId}</span>
              <Button onClick={() => { setIsCompleted(false); setSessionId(null); setSelectedCandidateId(null); }} className="bg-sky-600 hover:bg-sky-500 text-white font-mono-tech">
                Start New Interview
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  // Active Interview View with AIChatBox
  if (isInterviewActive && sessionId) {
    const chatMessages = (sessionStatus?.history || []).map((h: any) => ({
      role: h.role === 'user' ? ('user' as const) : ('assistant' as const),
      content: h.content
    }));

    return (
      <div className="min-h-screen blueprint-grid flex flex-col lg:flex-row">
        {/* Sidebar / Header Panel for Progress Tracking */}
        <div className="w-full lg:w-80 bg-slate-900 text-white p-6 flex flex-col justify-between border-r border-slate-800">
          <div className="space-y-6">
            <div>
              <span className="font-mono-tech text-xs tracking-widest text-sky-400 uppercase">Active Session // Telemetry</span>
              <h2 className="text-2xl font-bold tracking-tight mt-1">The Interview Agent</h2>
              <p className="text-xs text-slate-400 font-mono-tech mt-1">Candidate: {sessionStatus?.candidateName}</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700">
                <div className="text-xs font-mono-tech text-slate-400 uppercase">Question Progress</div>
                <div className="text-3xl font-extrabold text-sky-400 font-mono-tech mt-1">
                  {sessionStatus?.turnCount || 1} <span className="text-sm text-slate-400 font-normal">/ 8 min</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="bg-sky-500 h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, ((sessionStatus?.turnCount || 1) / 8) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700">
                <div className="text-xs font-mono-tech text-slate-400 uppercase">Curriculum Days Covered</div>
                <div className="text-3xl font-extrabold text-emerald-400 font-mono-tech mt-1">
                  {sessionStatus?.daysCount || 1} <span className="text-sm text-slate-400 font-normal">/ 4 min</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {sessionStatus?.curriculumDaysCovered?.map((day: number) => (
                    <Badge key={day} className="bg-slate-700 text-emerald-300 font-mono-tech text-xs">
                      Day {day}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 space-y-3">
            <div className="text-xs text-slate-400 font-mono-tech">
              * Minimum 8 questions across at least 4 curriculum days required to unlock feedback report.
            </div>
            <Button 
              onClick={() => concludeMutation.mutate({ sessionId })}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono-tech text-sm py-2"
              disabled={concludeMutation.isPending}
            >
              Conclude & Generate Feedback
            </Button>
          </div>
        </div>

        {/* Chat Interface using AIChatBox Component */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white/50 backdrop-blur-sm p-6 lg:p-8">
          <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs rounded-t-xl mb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono-tech text-sm font-semibold text-slate-800">Live Technical Mock Interview (AIChatBox)</span>
            </div>
            <span className="font-mono-tech text-xs text-slate-500">AI Cohort 31-Day Engineering Program</span>
          </div>

          <div className="flex-1 flex flex-col bg-white rounded-b-xl border border-slate-200 shadow-sm overflow-hidden">
            <AIChatBox
              messages={chatMessages}
              onSendMessage={(content) => {
                respondMutation.mutate({ sessionId, response: content });
              }}
              isLoading={respondMutation.isPending}
              placeholder="Type your technical answer explaining architecture, trade-offs, and implementation details..."
              height="100%"
              emptyStateMessage="Your interview conversation will appear here."
              suggestedPrompts={[
                "We implemented RAG using ChromaDB and hybrid search combining BM25 and vector similarity.",
                "Our agentic ReAct loop uses custom Pydantic schemas and tool-use function calling.",
                "We optimized LLM inference latency using vLLM quantization and semantic caching."
              ]}
              className="flex-1 border-0 shadow-none"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen blueprint-grid flex flex-col text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-300 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white font-mono-tech font-bold">
            IA
          </div>
          <div>
            <h1 className="font-extrabold tracking-tight text-lg">The Interview Agent</h1>
            <p className="text-xs font-mono-tech text-slate-500">Build the interviewer, not the interview.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-slate-900 text-sky-400 font-mono-tech text-xs hidden sm:inline-flex">
            AI Cohort 31-Day Enterprise AI
          </Badge>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 lg:py-24 max-w-6xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-sky-100 border border-sky-300 px-4 py-1.5 rounded-full text-sky-800 font-mono-tech text-xs font-semibold">
          <Terminal className="w-3.5 h-3.5" />
          <span>Interactive AI Technical Mock Interviewer</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-tight">
          Master Your AI Engineering Interview
        </h1>
        <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto font-normal">
          Conduct a realistic, multi-turn technical interview tailored to your exact 31-day AI Cohort learning journey. Get probed on architecture trade-offs, vector databases, RAG pipelines, and agentic workflows.
        </p>
      </section>

      {/* Candidate Profile Selection */}
      <section className="px-6 pb-24 max-w-6xl mx-auto w-full space-y-8">
        <div className="border-b border-slate-300 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Select Candidate Profile to Begin</h2>
            <p className="text-sm text-slate-500 font-mono-tech mt-1">Each profile simulates specific completed missions, skipped topics, and learning signals.</p>
          </div>
          <span className="font-mono-tech text-xs text-sky-600 bg-sky-50 border border-sky-200 px-3 py-1 rounded">
            {candidates?.length || 0} Profiles Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {candidates?.map((candidate: any) => (
            <Card key={candidate.candidate_id} className="border border-slate-300 bg-white/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge className="bg-slate-100 text-slate-700 font-mono-tech text-xs">
                    {candidate.candidate_id}
                  </Badge>
                  <span className="font-mono-tech text-xs text-emerald-600 font-semibold">
                    Engagement: {Math.round(candidate.learning_signals.engagement_score * 100)}%
                  </span>
                </div>
                <CardTitle className="text-xl font-bold mt-3">{candidate.name}</CardTitle>
                <CardDescription className="text-xs font-mono-tech text-sky-700">{candidate.role}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">{candidate.bio}</p>
                
                <div className="space-y-2">
                  <div className="text-xs font-mono-tech font-bold text-slate-700 uppercase">Completed Missions</div>
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.completed_missions.map((mission: string, i: number) => (
                      <span key={i} className="text-[11px] bg-emerald-50 border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded font-mono-tech">
                        ✓ {mission}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono-tech font-bold text-slate-700 uppercase">Skipped Topics</div>
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.skipped_topics.map((skip: string, i: number) => (
                      <span key={i} className="text-[11px] bg-amber-50 border border-amber-200 text-amber-800 px-2 py-0.5 rounded font-mono-tech">
                        ⚠ {skip}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t border-slate-100">
                <Button 
                  onClick={() => handleStartInterview(candidate.candidate_id)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-mono-tech text-sm group"
                  disabled={startMutation.isPending}
                >
                  {startMutation.isPending && selectedCandidateId === candidate.candidate_id ? 'Initializing...' : 'Start Mock Interview'}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-300 bg-white/80 py-6 text-center text-xs font-mono-tech text-slate-500">
        The Interview Agent — AI Cohort Challenge 2026 // Build the interviewer, not the interview.
      </footer>
    </div>
  );
}
