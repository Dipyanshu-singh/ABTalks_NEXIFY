import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecruiterDashboard() {
  const navigate = useNavigate();

  // ==========================================
  // BACKEND CONFIGURATION
  // ==========================================

  const API_BASE_URL = "http://localhost:5000/api";

  const token = localStorage.getItem("token");

  // ==========================================
  // STATE
  // ==========================================

  const [candidates, setCandidates] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [selectedCandidate, setSelectedCandidate] =
    useState(null);

  // ==========================================
  // FETCH CANDIDATES
  // ==========================================

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);
    setError("");

    try {
      /*
        BACKEND ENDPOINT:

        GET /api/recruiter/candidates

        Expected response:

        {
          candidates: [
            {
              id: "123",
              name: "Candidate Name",
              email: "candidate@email.com",
              role: "Frontend Developer",
              score: 82,
              status: "Completed"
            }
          ]
        }
      */

      const response = await fetch(
        `${API_BASE_URL}/recruiter/candidates`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to load candidates."
        );
      }

      setCandidates(data.candidates || []);
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Unable to load candidates."
      );

      /*
        TEMPORARY DEMO DATA

        Remove this when backend is connected.
      */

      setCandidates([
        {
          id: "1",
          name: "Aarav Sharma",
          email: "aarav@example.com",
          role: "Frontend Developer",
          score: 86,
          status: "Completed",
        },
        {
          id: "2",
          name: "Priya Singh",
          email: "priya@example.com",
          role: "Backend Developer",
          score: 78,
          status: "Completed",
        },
        {
          id: "3",
          name: "Rahul Verma",
          email: "rahul@example.com",
          role: "Full Stack Developer",
          score: 91,
          status: "Completed",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FILTER CANDIDATES
  // ==========================================

  const filteredCandidates = candidates.filter(
    (candidate) => {
      const text = search.toLowerCase();

      return (
        candidate.name
          ?.toLowerCase()
          .includes(text) ||
        candidate.email
          ?.toLowerCase()
          .includes(text) ||
        candidate.role
          ?.toLowerCase()
          .includes(text)
      );
    }
  );

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // ==========================================
  // SCORE COLOR
  // ==========================================

  const getScoreColor = (score) => {
    if (score >= 80) {
      return "text-green-400";
    }

    if (score >= 60) {
      return "text-yellow-400";
    }

    return "text-red-400";
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-[#081C3A] text-white">

      {/* Background */}

      <div className="fixed top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="fixed bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* ========================================
          NAVBAR
      ======================================== */}

      <header className="relative border-b border-white/10 bg-[#081C3A]/90">

        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-xl font-bold">
              AI Interview Agent
            </h1>

            <p className="text-cyan-400 text-sm">
              Recruiter Dashboard
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5"
          >
            Logout
          </button>

        </div>

      </header>

      {/* ========================================
          MAIN
      ======================================== */}

      <main className="relative max-w-7xl mx-auto px-6 py-10">

        {/* Heading */}

        <div className="mb-8">

          <h2 className="text-3xl font-bold">
            Candidates
          </h2>

          <p className="text-gray-400 mt-2">
            Review AI interview results and candidate
            performance.
          </p>

        </div>

        {/* ========================================
            STATISTICS
        ======================================== */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

            <p className="text-gray-400 text-sm">
              Total Candidates
            </p>

            <p className="text-3xl font-bold mt-2">
              {candidates.length}
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

            <p className="text-gray-400 text-sm">
              Interviews Completed
            </p>

            <p className="text-3xl font-bold mt-2">
              {
                candidates.filter(
                  (candidate) =>
                    candidate.status === "Completed"
                ).length
              }
            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

            <p className="text-gray-400 text-sm">
              Average Score
            </p>

            <p className="text-3xl font-bold mt-2 text-cyan-400">

              {candidates.length > 0
                ? Math.round(
                    candidates.reduce(
                      (total, candidate) =>
                        total +
                        Number(candidate.score || 0),
                      0
                    ) / candidates.length
                  )
                : 0}
              %

            </p>

          </div>

        </div>

        {/* ========================================
            SEARCH
        ======================================== */}

        <div className="mb-6">

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search candidates..."
            className="w-full md:w-96 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400"
          />

        </div>

        {/* ========================================
            ERROR
        ======================================== */}

        {error && (
          <div className="mb-5 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm">
            Backend is not connected yet. Showing demo
            candidates.
          </div>
        )}

        {/* ========================================
            CANDIDATES TABLE
        ======================================== */}

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

          {loading ? (

            <div className="p-10 text-center text-gray-400">
              Loading candidates...
            </div>

          ) : filteredCandidates.length === 0 ? (

            <div className="p-10 text-center">

              <p className="text-gray-400">
                No candidates found.
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-white/5">

                  <tr>

                    <th className="text-left px-6 py-4 text-gray-400 text-sm font-medium">
                      Candidate
                    </th>

                    <th className="text-left px-6 py-4 text-gray-400 text-sm font-medium">
                      Role
                    </th>

                    <th className="text-left px-6 py-4 text-gray-400 text-sm font-medium">
                      Score
                    </th>

                    <th className="text-left px-6 py-4 text-gray-400 text-sm font-medium">
                      Status
                    </th>

                    <th className="text-right px-6 py-4 text-gray-400 text-sm font-medium">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredCandidates.map(
                    (candidate) => (

                      <tr
                        key={candidate.id}
                        className="border-t border-white/10 hover:bg-white/5"
                      >

                        {/* Candidate */}

                        <td className="px-6 py-5">

                          <div>

                            <p className="font-semibold">
                              {candidate.name}
                            </p>

                            <p className="text-gray-500 text-sm">
                              {candidate.email}
                            </p>

                          </div>

                        </td>

                        {/* Role */}

                        <td className="px-6 py-5 text-gray-300">
                          {candidate.role}
                        </td>

                        {/* Score */}

                        <td
                          className={`px-6 py-5 font-bold ${getScoreColor(
                            candidate.score
                          )}`}
                        >
                          {candidate.score}%
                        </td>

                        {/* Status */}

                        <td className="px-6 py-5">

                          <span className="px-3 py-1 rounded-full text-xs bg-green-400/10 text-green-400">
                            {candidate.status}
                          </span>

                        </td>

                        {/* Action */}

                        <td className="px-6 py-5 text-right">

                          <button
                            onClick={() =>
                              setSelectedCandidate(
                                candidate
                              )
                            }
                            className="px-4 py-2 rounded-lg bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400/20"
                          >
                            View
                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </main>

      {/* ========================================
          CANDIDATE MODAL
      ======================================== */}

      {selectedCandidate && (

        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-6">

          <div className="w-full max-w-lg bg-[#0D2852] border border-white/10 rounded-3xl p-7">

            <div className="flex justify-between items-start">

              <div>

                <h3 className="text-2xl font-bold">
                  {selectedCandidate.name}
                </h3>

                <p className="text-gray-400 mt-1">
                  {selectedCandidate.email}
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedCandidate(null)
                }
                className="text-gray-400 hover:text-white text-xl"
              >
                ×
              </button>

            </div>

            <div className="mt-7 space-y-4">

              <div className="bg-white/5 rounded-xl p-4">

                <p className="text-gray-500 text-sm">
                  Applied Role
                </p>

                <p className="font-semibold mt-1">
                  {selectedCandidate.role}
                </p>

              </div>

              <div className="bg-white/5 rounded-xl p-4">

                <p className="text-gray-500 text-sm">
                  Interview Score
                </p>

                <p
                  className={`text-3xl font-bold mt-1 ${getScoreColor(
                    selectedCandidate.score
                  )}`}
                >
                  {selectedCandidate.score}%
                </p>

              </div>

              <div className="bg-white/5 rounded-xl p-4">

                <p className="text-gray-500 text-sm">
                  Interview Status
                </p>

                <p className="font-semibold mt-1">
                  {selectedCandidate.status}
                </p>

              </div>

            </div>

            {/* Backend-ready button */}

            <button
              onClick={() => {
                /*
                  Later connect this to:

                  GET /api/recruiter/candidates/:id/results

                  candidate.id
                */

                console.log(
                  "Selected candidate:",
                  selectedCandidate.id
                );
              }}
              className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold"
            >
              View Full Interview Report
            </button>

          </div>

        </div>

      )}

    </div>
  );
}