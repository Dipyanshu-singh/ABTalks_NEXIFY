import { describe, expect, it } from "vitest";
import express from "express";
import request from "supertest";
import { registerInterviewApi } from "./interviewApi";

function createTestApp() {
  const app = express();
  app.use(express.json());
  registerInterviewApi(app);
  return app;
}

describe("POST /api/interview technical specification", () => {
  it("initializes a new interview session when message is omitted", async () => {
    const app = createTestApp();
    const res = await request(app)
      .post("/api/interview")
      .send({
        sessionId: "test-spec-123",
        candidate: {
          candidate_id: "cand_001",
          name: "Alex Mercer",
          completed_missions: ["RAG Hybrid Search"]
        }
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("reply");
    expect(res.body).toHaveProperty("done", false);
    expect(typeof res.body.reply).toBe("string");
  });

  it("handles conversation turn when message is provided", async () => {
    const app = createTestApp();
    const sessionId = "test-spec-456";

    // Start session
    await request(app)
      .post("/api/interview")
      .send({
        sessionId,
        candidate: { name: "Jordan Vance" }
      });

    // Send response turn
    const res = await request(app)
      .post("/api/interview")
      .send({
        sessionId,
        message: "We implemented custom RAG chunking and vector indexing."
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("reply");
    expect(res.body).toHaveProperty("done", false);
  });
});
