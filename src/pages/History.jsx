import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { FaHistory, FaCalendarAlt, FaClock, FaEye } from "react-icons/fa";

export default function History() {
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : { login: "Guest" };

  const [stats, setStats] = useState({
    ats_score: 0,
    job_match: 0,
    interviews: 0,
    resume_uploaded: false,
  });

  useEffect(() => {
    const t = localStorage.getItem("token");
    fetch("https://abtalks-nexify-1.onrender.com/dashboard", {
      headers: { Authorization: `Bearer ${t}` },
    })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app-bg fade-in">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div style={{ padding: 20, position: "relative", zIndex: 2 }}>
        <h1 className="title">Interview History</h1>
        <p className="subtitle">
          Track your past AI interviews, scores and progress for {user.login}.
        </p>

        {/* Summary stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Interviews</h3>
            <h1>{stats.interviews}</h1>
          </div>
          <div className="stat-card">
            <h3>ATS Score</h3>
            <h1>{stats.ats_score}%</h1>
          </div>
          <div className="stat-card">
            <h3>Job Match</h3>
            <h1>{stats.job_match}%</h1>
          </div>
          <div className="stat-card">
            <h3>Resume</h3>
            <h1>{stats.resume_uploaded ? "Uploaded" : "Pending"}</h1>
          </div>
        </div>

        {/* Full width info card */}
        <div className="card" style={{ marginTop: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <FaHistory style={{ fontSize: 34, color: "#16a34a" }} />
            <div>
              <h2 style={{ color: "#111827", fontSize: 20 }}>Your Interview Reports</h2>
              <p style={{ color: "#6b7280", lineHeight: 1.7, marginTop: 6 }}>
                Complete interview history, AI feedback and downloadable reports are
                generated after each session. New interviews will appear here with
                detailed performance analytics.
              </p>
            </div>
          </div>
        </div>

        {/* Placeholder empty state showing dynamic user */}
        <div
          className="card"
          style={{
            textAlign: "center",
            padding: "60px 30px",
            maxWidth: 560,
            margin: "30px auto",
          }}
        >
          <div style={{ fontSize: 60 }}>📜</div>
          <h2 style={{ color: "#111827", margin: "20px 0 10px" }}>
            No Interviews Yet
          </h2>
          <p style={{ color: "#6b7280", lineHeight: 1.7 }}>
            When you complete an AI interview, {user.login}, your results will be
            saved here with scores, feedback and improvement charts.
          </p>
        </div>
      </div>
    </div>
  );
}
