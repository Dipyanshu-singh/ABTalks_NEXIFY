import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMicrophone,
  FaPaperPlane,
  FaStop,
  FaRobot,
  FaUser,
} from "react-icons/fa";

export default function Interview() {
  const navigate = useNavigate();

  // =====================================================
  // BACKEND / INTERVIEW VARIABLES
  // =====================================================

  // These values will eventually come from your backend
  const [interviewId, setInterviewId] = useState(
    localStorage.getItem("interviewId") || ""
  );

  const [candidateId, setCandidateId] = useState(
    localStorage.getItem("candidateId") || ""
  );

  const [role, setRole] = useState(
    localStorage.getItem("interviewRole") || "Frontend Developer"
  );

  // =====================================================
  // QUESTION VARIABLES
  // =====================================================

  const [currentQuestion, setCurrentQuestion] = useState(
    "Tell me about yourself and your experience with frontend development."
  );

  const [questionNumber, setQuestionNumber] = useState(1);

  const [totalQuestions, setTotalQuestions] = useState(10);

  // Backend can eventually send this
  const [questionId, setQuestionId] = useState("");

  // =====================================================
  // ANSWER VARIABLES
  // =====================================================

  const [answer, setAnswer] = useState("");

  const [previousAnswers, setPreviousAnswers] = useState([]);

  // =====================================================
  // AI / FEEDBACK VARIABLES
  // =====================================================

  const [feedback, setFeedback] = useState(null);

  const [aiThinking, setAiThinking] = useState(false);

  // =====================================================
  // LOADING / ERROR VARIABLES
  // =====================================================

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // =====================================================
  // TIMER
  // =====================================================

  const [timeRemaining, setTimeRemaining] = useState(15 * 60);

  // =====================================================
  // VOICE INPUT
  // =====================================================

  const [isListening, setIsListening] = useState(false);

  // =====================================================
  // GET TOKEN
  // =====================================================

  const token = localStorage.getItem("token");

  // =====================================================
  // API BASE URL
  // =====================================================

  // Later move this to src/config/api.js
  const API_BASE_URL = "http://localhost:5000/api";

  // =====================================================
  // FORMAT TIMER
  // =====================================================

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // =====================================================
  // TIMER EFFECT
  // =====================================================

  useEffect(() => {
    if (timeRemaining <= 0) {
      handleEndInterview();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // =====================================================
  // GET FIRST QUESTION FROM BACKEND
  // =====================================================

  useEffect(() => {
    /*
      BACKEND ENDPOINT:

      GET /api/interview/:interviewId/question

      Expected response:

      {
        questionId: "q123",
        question: "Explain React hooks.",
        questionNumber: 1,
        totalQuestions: 10
      }
    */

    const fetchQuestion = async () => {
      if (!interviewId) return;

      try {
        setAiThinking(true);

        const response = await fetch(
          `${API_BASE_URL}/interview/${interviewId}/question`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load interview question");
        }

        const data = await response.json();

        // Backend data
        setCurrentQuestion(data.question);
        setQuestionId(data.questionId);
        setQuestionNumber(data.questionNumber);
        setTotalQuestions(data.totalQuestions);
      } catch (err) {
        /*
          During frontend development,
          we keep the demo question instead
          of breaking the page.
        */

        console.error(err);
      } finally {
        setAiThinking(false);
      }
    };

    fetchQuestion();
  }, [interviewId]);

  // =====================================================
  // SUBMIT ANSWER
  // =====================================================

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      setError("Please enter an answer before submitting.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      /*
        BACKEND ENDPOINT:

        POST /api/interview/:interviewId/answer

        Request:

        {
          questionId: "...",
          answer: "..."
        }

        Expected response:

        {
          feedback: {
            score: 8,
            strengths: "...",
            improvement: "..."
          },

          nextQuestion: {
            id: "...",
            question: "..."
          },

          questionNumber: 2
        }
      */

      const response = await fetch(
        `${API_BASE_URL}/interview/${interviewId}/answer`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            questionId: questionId,
            answer: answer,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to submit answer");
      }

      const data = await response.json();

      // Store previous answer
      setPreviousAnswers((previous) => [
        ...previous,
        {
          question: currentQuestion,
          answer: answer,
          feedback: data.feedback,
        },
      ]);

      // Backend feedback
      setFeedback(data.feedback);

      // Backend next question
      if (data.nextQuestion) {
        setCurrentQuestion(data.nextQuestion.question);
        setQuestionId(data.nextQuestion.id);
        setQuestionNumber(data.questionNumber);
      }

      setAnswer("");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // VOICE INPUT
  // =====================================================

  const handleVoiceInput = () => {
    /*
      OPTIONAL:

      Browser Speech Recognition can be connected here.

      Example:

      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

      const recognition = new SpeechRecognition();

      recognition.start();

      recognition.onresult = (event) => {
        setAnswer(event.results[0][0].transcript);
      };
    */

    setIsListening(!isListening);

    console.log("Voice input will be connected here.");
  };

  // =====================================================
  // END INTERVIEW
  // =====================================================

  const handleEndInterview = async () => {
    try {
      /*
        BACKEND ENDPOINT:

        POST /api/interview/:interviewId/end

        Expected response:

        {
          resultId: "...",
          overallScore: 87
        }
      */

      const response = await fetch(
        `${API_BASE_URL}/interview/${interviewId}/end`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      // Save result ID for Results page
      if (data.resultId) {
        localStorage.setItem("resultId", data.resultId);
      }

      navigate("/results");
    } catch (err) {
      console.error(err);

      // For frontend testing
      navigate("/results");
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-[#081C3A] text-white">

      {/* Background glow */}

      <div className="fixed top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="fixed bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="relative border-b border-white/10 bg-[#081C3A]/80 backdrop-blur-xl">

        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">

          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              AI Interview
            </h1>

            <p className="text-gray-400 text-sm mt-1">
              {role}
            </p>
          </div>

          <div className="text-right">

            <p className="text-cyan-400 font-semibold">
              Question {questionNumber} / {totalQuestions}
            </p>

            <p
              className={`text-sm mt-1 ${
                timeRemaining < 60
                  ? "text-red-400"
                  : "text-gray-400"
              }`}
            >
              Time Left: {formatTime(timeRemaining)}
            </p>

          </div>

        </div>

      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="relative max-w-5xl mx-auto px-6 py-8">

        {/* Progress */}

        <div className="w-full bg-white/10 rounded-full h-2 mb-8">

          <div
            className="bg-gradient-to-r from-cyan-400 to-blue-600 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${
                (questionNumber / totalQuestions) * 100
              }%`,
            }}
          />

        </div>

        {/* Error */}

        {error && (
          <div className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300">
            {error}
          </div>
        )}

        {/* =================================================
            AI QUESTION
        ================================================= */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 mb-6">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">

              <FaRobot className="text-white text-xl" />

            </div>

            <div>

              <p className="text-cyan-400 font-semibold mb-2">
                AI Interviewer
              </p>

              {aiThinking ? (
                <p className="text-gray-400">
                  AI is preparing your question...
                </p>
              ) : (
                <p className="text-white text-lg leading-relaxed">
                  {currentQuestion}
                </p>
              )}

            </div>

          </div>

        </div>

        {/* =================================================
            ANSWER
        ================================================= */}

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-10 h-10 rounded-xl bg-[#103066] flex items-center justify-center">

              <FaUser className="text-cyan-400" />

            </div>

            <h2 className="font-semibold">
              Your Answer
            </h2>

          </div>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            rows={8}
            disabled={loading}
            className="w-full bg-[#0D2852] border border-white/10 rounded-2xl p-5 text-white placeholder-gray-500 outline-none resize-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10 transition"
          />

          {/* Character count */}

          <div className="text-right text-xs text-gray-500 mt-2">
            {answer.length} characters
          </div>

          {/* Buttons */}

          <div className="flex flex-col sm:flex-row gap-3 mt-5">

            {/* Voice */}

            <button
              type="button"
              onClick={handleVoiceInput}
              className={`sm:w-auto px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 border transition ${
                isListening
                  ? "bg-red-500/20 border-red-400 text-red-300"
                  : "border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10"
              }`}
            >
              <FaMicrophone />

              {isListening
                ? "Listening..."
                : "Speak"}
            </button>

            {/* Submit */}

            <button
              type="button"
              onClick={handleSubmitAnswer}
              disabled={loading || !answer.trim()}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold flex items-center justify-center gap-2 hover:scale-[1.01] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >

              {loading ? (
                "AI is evaluating..."
              ) : (
                <>
                  Submit Answer
                  <FaPaperPlane className="text-sm" />
                </>
              )}

            </button>

          </div>

        </div>

        {/* =================================================
            AI FEEDBACK
        ================================================= */}

        {feedback && (
          <div className="mt-6 bg-white/10 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-6">

            <h2 className="text-cyan-400 font-semibold mb-4">
              AI Feedback
            </h2>

            <p className="text-gray-300">
              {feedback.message ||
                feedback.improvement ||
                "Good attempt. Keep practicing!"}
            </p>

            {feedback.score !== undefined && (
              <p className="mt-4 text-white font-semibold">
                Score:{" "}
                <span className="text-cyan-400">
                  {feedback.score}/10
                </span>
              </p>
            )}

          </div>
        )}

        {/* =================================================
            END INTERVIEW
        ================================================= */}

        <div className="flex justify-center mt-8">

          <button
            type="button"
            onClick={handleEndInterview}
            className="px-6 py-3 rounded-xl border border-red-400/40 text-red-400 hover:bg-red-500/10 transition flex items-center gap-2"
          >
            <FaStop />
            End Interview
          </button>

        </div>

      </main>

    </div>
  );
}