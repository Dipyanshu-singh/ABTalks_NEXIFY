import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaRedo,
  FaDownload,
  FaChartLine,
  FaLightbulb,
  FaArrowLeft,
} from "react-icons/fa";

export default function Results() {
  const navigate = useNavigate();

  // =====================================================
  // BACKEND VARIABLES
  // =====================================================

  const API_BASE_URL = "http://localhost:5000/api";

  const token = localStorage.getItem("token");

  const resultId = localStorage.getItem("resultId");

  // =====================================================
  // RESULT DATA
  // =====================================================

  const [result, setResult] = useState({
    overallScore: 0,
    technicalScore: 0,
    communicationScore: 0,
    confidenceScore: 0,
    problemSolvingScore: 0,

    recommendation: "",

    strengths: [],
    improvements: [],

    interviewId: "",
    candidateName: "",
    role: "",
    completedAt: "",
  });

  // =====================================================
  // UI VARIABLES
  // =====================================================

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [downloading, setDownloading] = useState(false);

  // =====================================================
  // FETCH RESULTS
  // =====================================================

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);

        /*
          BACKEND ENDPOINT:

          GET /api/results/:resultId

          Expected response:

          {
            overallScore: 87,
            technicalScore: 90,
            communicationScore: 82,
            confidenceScore: 89,
            problemSolvingScore: 86,

            recommendation: "Strong Candidate",

            strengths: [
              "Strong technical fundamentals",
              "Good communication"
            ],

            improvements: [
              "Improve DSA",
              "Give more detailed examples"
            ],

            interviewId: "...",
            candidateName: "...",
            role: "Frontend Developer",
            completedAt: "2026-08-08"
          }
        */

        if (!resultId) {
          throw new Error("Result ID not found.");
        }

        const response = await fetch(
          `${API_BASE_URL}/results/${resultId}`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load interview results.");
        }

        const data = await response.json();

        setResult({
          overallScore: data.overallScore ?? 0,
          technicalScore: data.technicalScore ?? 0,
          communicationScore:
            data.communicationScore ?? 0,
          confidenceScore: data.confidenceScore ?? 0,
          problemSolvingScore:
            data.problemSolvingScore ?? 0,

          recommendation: data.recommendation ?? "",

          strengths: data.strengths ?? [],
          improvements: data.improvements ?? [],

          interviewId: data.interviewId ?? "",
          candidateName: data.candidateName ?? "",
          role: data.role ?? "",
          completedAt: data.completedAt ?? "",
        });
      } catch (err) {
        console.error(err);

        setError(
          err.message ||
            "Something went wrong while loading results."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [resultId, token]);

  // =====================================================
  // DOWNLOAD REPORT
  // =====================================================

  const handleDownloadReport = async () => {
    try {
      setDownloading(true);

      /*
        BACKEND ENDPOINT:

        GET /api/results/:resultId/report

        Backend should return a PDF.
      */

      const response = await fetch(
        `${API_BASE_URL}/results/${resultId}/report`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to download report.");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = "AI-Interview-Report.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);

      alert(
        err.message ||
          "Unable to download the report."
      );
    } finally {
      setDownloading(false);
    }
  };

  // =====================================================
  // RETAKE
  // =====================================================

  const handleRetake = () => {
    navigate("/upload");
  };

  // =====================================================
  // SCORE COLOR
  // =====================================================

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-400";

    if (score >= 60) return "text-yellow-400";

    return "text-red-400";
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#081C3A] flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto" />

          <p className="text-gray-400 mt-4">
            Generating your interview report...
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-[#081C3A] text-white">

      {/* Background glow */}

      <div className="fixed top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="fixed bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <main className="relative max-w-6xl mx-auto px-6 py-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-8">

          <div>

            <button
              onClick={() => navigate("/")}
              className="text-gray-400 hover:text-cyan-400 flex items-center gap-2 text-sm mb-4"
            >
              <FaArrowLeft />
              Back to Home
            </button>

            <h1 className="text-4xl font-bold">
              Interview Results
            </h1>

            <p className="text-gray-400 mt-2">
              {result.role || "AI Mock Interview"}
            </p>

          </div>

          <div className="flex gap-3">

            <button
              onClick={handleRetake}
              className="px-5 py-3 rounded-xl border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 flex items-center gap-2"
            >
              <FaRedo />
              Retake
            </button>

            <button
              onClick={handleDownloadReport}
              disabled={downloading}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              <FaDownload />

              {downloading
                ? "Generating..."
                : "Download Report"}
            </button>

          </div>

        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300">
            {error}
          </div>
        )}

        {/* =================================================
            OVERALL SCORE
        ================================================= */}

        <section className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-6">

          <div className="grid md:grid-cols-2 gap-8 items-center">

            {/* Score */}

            <div className="text-center">

              <p className="text-gray-400">
                Overall Performance
              </p>

              <div className="relative w-52 h-52 mx-auto my-5">

                {/* Circle */}

                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(
                      #22d3ee ${result.overallScore * 3.6}deg,
                      rgba(255,255,255,0.08) 0deg
                    )`,
                  }}
                />

                <div className="absolute inset-3 rounded-full bg-[#081C3A] flex flex-col items-center justify-center">

                  <span className="text-5xl font-bold text-cyan-400">
                    {result.overallScore}
                  </span>

                  <span className="text-gray-500">
                    / 100
                  </span>

                </div>

              </div>

              <h2 className="text-2xl font-bold">

                {result.recommendation ||
                  (result.overallScore >= 80
                    ? "Excellent Performance!"
                    : result.overallScore >= 60
                    ? "Good Performance"
                    : "Keep Practicing")}

              </h2>

            </div>

            {/* Candidate Information */}

            <div className="bg-[#0D2852] rounded-2xl p-6">

              <h3 className="font-semibold text-cyan-400 mb-5">
                Interview Summary
              </h3>

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Candidate
                  </span>

                  <span>
                    {result.candidateName || "--"}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Role
                  </span>

                  <span>
                    {result.role || "--"}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-500">
                    Completed
                  </span>

                  <span>
                    {result.completedAt || "--"}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            SCORE BREAKDOWN
        ================================================= */}

        <section className="mb-6">

          <div className="flex items-center gap-3 mb-5">

            <FaChartLine className="text-cyan-400" />

            <h2 className="text-2xl font-bold">
              Score Breakdown
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Technical */}

            <ScoreCard
              title="Technical Skills"
              score={result.technicalScore}
              getScoreColor={getScoreColor}
            />

            {/* Communication */}

            <ScoreCard
              title="Communication"
              score={result.communicationScore}
              getScoreColor={getScoreColor}
            />

            {/* Confidence */}

            <ScoreCard
              title="Confidence"
              score={result.confidenceScore}
              getScoreColor={getScoreColor}
            />

            {/* Problem Solving */}

            <ScoreCard
              title="Problem Solving"
              score={result.problemSolvingScore}
              getScoreColor={getScoreColor}
            />

          </div>

        </section>

        {/* =================================================
            FEEDBACK
        ================================================= */}

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Strengths */}

          <section className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7">

            <div className="flex items-center gap-3 mb-5">

              <FaCheckCircle className="text-green-400" />

              <h2 className="text-xl font-bold">
                Your Strengths
              </h2>

            </div>

            {result.strengths.length > 0 ? (

              <ul className="space-y-4">

                {result.strengths.map(
                  (strength, index) => (

                    <li
                      key={index}
                      className="flex gap-3 text-gray-300"
                    >

                      <span className="text-green-400">
                        ✓
                      </span>

                      {strength}

                    </li>

                  )
                )}

              </ul>

            ) : (

              <p className="text-gray-500">
                AI-generated strengths will appear here.
              </p>

            )}

          </section>

          {/* Improvements */}

          <section className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7">

            <div className="flex items-center gap-3 mb-5">

              <FaLightbulb className="text-yellow-400" />

              <h2 className="text-xl font-bold">
                Areas to Improve
              </h2>

            </div>

            {result.improvements.length > 0 ? (

              <ul className="space-y-4">

                {result.improvements.map(
                  (improvement, index) => (

                    <li
                      key={index}
                      className="flex gap-3 text-gray-300"
                    >

                      <span className="text-yellow-400">
                        →
                      </span>

                      {improvement}

                    </li>

                  )
                )}

              </ul>

            ) : (

              <p className="text-gray-500">
                AI-generated improvement suggestions
                will appear here.
              </p>

            )}

          </section>

        </div>

      </main>

    </div>
  );
}


// =====================================================
// SCORE CARD COMPONENT
// =====================================================

function ScoreCard({
  title,
  score,
  getScoreColor,
}) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <div className="flex items-end gap-2 mt-3">

        <span
          className={`text-4xl font-bold ${getScoreColor(
            score
          )}`}
        >
          {score}
        </span>

        <span className="text-gray-500 mb-1">
          / 100
        </span>

      </div>

      {/* Progress */}

      <div className="mt-4 h-2 bg-white/10 rounded-full">

        <div
          className="h-2 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full transition-all duration-700"
          style={{
            width: `${Math.min(score, 100)}%`,
          }}
        />

      </div>

    </div>
  );
}