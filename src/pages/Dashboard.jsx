import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import "../styles/dashboard.css";
import {
  FaFileAlt,
  FaMicrophone,
  FaComments,
  FaChartLine,
  FaHistory,
  FaArrowRight,
  FaLightbulb,
} from "react-icons/fa";

function Dashboard() {
  const token = localStorage.getItem("token");

  const user = token
    ? jwtDecode(token)
    : {
      login: "Guest",
      avatar: "https://github.com/github.png",
    };
  const [stats, setStats] = useState({
    ats_score: 0,
    job_match: 0,
    interviews: 0,
    resume_uploaded: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://abtalks-nexify-1.onrender.com/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      })
      .catch((err) => console.log(err));
  }, []);

return (
    <div className="dashboard app-bg">

      {/* Floating aurora orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Welcome */}
      <div className="welcome-card">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <img
            src={user.avatar}
            alt=""
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
            }}
          />

          <div>
            <h1>Welcome {user.login} 👋</h1>
            <p>Your AI-powered interview preparation platform.</p>
          </div>
        </div>

        <p>
          Your AI-powered interview preparation platform.
          Upload your resume, practice interviews,
          receive AI-powered feedback, and track your
          performance in one place.
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid">

        <div className="stat-card">
          <h3>ATS Score</h3>
          <h1>{stats.ats_score}%</h1>
        </div>

        <div className="stat-card">
          <h3>Job Match</h3>
          <h1>{stats.job_match}%</h1>
        </div>

        <div className="stat-card">
          <h3>Interviews</h3>
          <h1>{stats.interviews}</h1>
        </div>

        <div className="stat-card">
          <h3>Resume</h3>
          <h1>{stats.resume_uploaded ? "Uploaded" : "Not Uploaded"}</h1>
        </div>

      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-grid">

        <Link to="/resume" className="dashboard-card">
          <FaFileAlt className="dash-icon" />
          <h2>Resume Analysis</h2>

          <p>
            Upload your resume and receive ATS score,
            keyword suggestions and AI improvements.
          </p>

          <span>
            Open <FaArrowRight />
          </span>
        </Link>

        <Link to="/interview" className="dashboard-card">
          <FaMicrophone className="dash-icon" />
          <h2>AI Mock Interview</h2>

          <p>
            Practice HR, Technical and Mixed interviews
            with AI-generated questions.
          </p>

          <span>
            Start <FaArrowRight />
          </span>
        </Link>

        <Link to="/analytics" className="dashboard-card">
          <FaComments className="dash-icon" />
          <h2>AI Feedback</h2>

          <p>
            Review communication, confidence,
            grammar and technical feedback.
          </p>

          <span>
            View <FaArrowRight />
          </span>
        </Link>

        <Link to="/analytics" className="dashboard-card">
          <FaChartLine className="dash-icon" />
          <h2>Results & Analytics</h2>

          <p>
            Check interview scores,
            analytics and improvement charts.
          </p>

          <span>
            Open <FaArrowRight />
          </span>
        </Link>

        <Link to="/history" className="dashboard-card">
          <FaHistory className="dash-icon" />
          <h2>Interview History</h2>

          <p>
            View all previous interviews,
            reports and progress history.
          </p>

          <span>
            History <FaArrowRight />
          </span>
        </Link>

        <div className="dashboard-card">
          <FaLightbulb className="dash-icon" />
          <h2>Coming Soon</h2>

          <p>
            Eye-contact detection,
            emotion analysis,
            voice confidence,
            AI career recommendations.
          </p>

          <span>Updates Soon 🚀</span>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;