import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { FaUser, FaEnvelope, FaChartLine, FaMicrophone } from "react-icons/fa";

export default function Profile() {
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : { login: "Guest", avatar: "" };

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
        <h1 className="title">Profile</h1>
        <p className="subtitle">Your InterviewIQ AI account details.</p>

        <div className="grid grid-2">
          {/* Profile summary */}
          <div className="card" style={{ textAlign: "center" }}>
            <img
              src={user.avatar}
              alt="avatar"
              style={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                margin: "0 auto 16px",
                border: "3px solid #16a34a",
              }}
            />
            <h2 style={{ color: "#111827", fontSize: 22 }}>{user.login}</h2>
            <p style={{ color: "#6b7280", margin: "6px 0 20px" }}>
              <FaEnvelope /> Signed in via GitHub
            </p>

            <div className="stats-grid" style={{ margin: 0 }}>
              <div className="stat-card">
                <h3><FaMicrophone /> Interviews</h3>
                <h1>{stats.interviews}</h1>
              </div>
              <div className="stat-card">
                <h3><FaChartLine /> Job Match</h3>
                <h1>{stats.job_match}%</h1>
              </div>
              <div className="stat-card">
                <h3>Resume</h3>
                <h1>{stats.resume_uploaded ? "✅" : "—"}</h1>
              </div>
            </div>
          </div>

          {/* Account details */}
          <div className="card">
            <h2 style={{ color: "#111827", fontSize: 20, marginBottom: 20 }}>
              Account Information
            </h2>

            <div className="input-group" style={{ marginBottom: 16 }}>
              <FaUser className="input-icon" />
              <input
                type="text"
                value={user.login || ""}
                readOnly
                style={{ paddingLeft: 48 }}
              />
            </div>

            <div className="input-group" style={{ marginBottom: 16 }}>
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                value={`${user.login || "user"}@github.com`}
                readOnly
                style={{ paddingLeft: 48 }}
              />
            </div>

            <div className="card" style={{ background: "#e8f7ee", marginTop: 12 }}>
              <h3 style={{ color: "#15803d", marginBottom: 10 }}>InterviewIQ AI</h3>
              <p style={{ color: "#6b7280", lineHeight: 1.7 }}>
                Your subscription is linked to your GitHub account. Resume analysis,
                AI interviews and performance analytics are available on your dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
