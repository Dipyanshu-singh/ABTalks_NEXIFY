import { Link } from "react-router-dom";
import "../styles/dashboard.css";
import {
  FaFileAlt,
  FaRobot,
  FaComments,
  FaChartLine,
  FaHistory,
  FaArrowRight,
} from "react-icons/fa";

function Home() {
  return (
    <>
      <Navbar />

      <div className="dashboard">

        {/* Welcome Section */}

        <div className="welcome-card">

          <h1>Welcome to QORA 👋</h1>

          <p>
            Your AI-powered interview preparation platform.
            Upload your resume, practice interviews,
            receive AI-powered feedback, and track your
            performance in one place.
          </p>

        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>ATS Score</h3>
            <h1>82%</h1>
          </div>

          <div className="stat-card">
            <h3>Job Match</h3>
            <h1>76%</h1>
          </div>

          <div className="stat-card">
            <h3>Interviews</h3>
            <h1>5</h1>
          </div>

          <div className="stat-card">
            <h3>Resume</h3>
            <h1>Uploaded</h1>
          </div>

        </div>

        <div className="dashboard-grid">

          {/* Resume */}

          <Link to="/resume" className="dashboard-card">

            <FaFileAlt className="dash-icon" />

            <h2>Resume Analysis</h2>

            <p>
              Upload your resume and receive ATS score,
              keyword suggestions, and AI improvements.
            </p>

            <span>
              Open <FaArrowRight />
            </span>

          </Link>

          {/* Interview */}

          <Link to="/interview" className="dashboard-card">

            <FaRobot className="dash-icon" />

            <h2>AI Mock Interview</h2>

            <p>
              Practice HR, Technical and Mixed interviews
              with AI-generated questions.
            </p>

            <span>
              Start <FaArrowRight />
            </span>

          </Link>

          {/* Feedback */}

          <Link to="/dashboard" className="dashboard-card">

            <FaComments className="dash-icon" />

            <h2>AI Feedback</h2>

            <p>
              Review communication,
              confidence,
              grammar and technical feedback.
            </p>

            <span>
              View <FaArrowRight />
            </span>

          </Link>

          {/* Results */}

          <Link to="/dashboard" className="dashboard-card">

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

          {/* History */}

          <Link to="/dashboard" className="dashboard-card">

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

          {/* Upcoming Feature */}

          <div className="dashboard-card">

            <FaRobot className="dash-icon" />

            <h2>Coming Soon</h2>

            <p>
              Eye-contact detection,
              emotion analysis,
              voice confidence,
              AI career recommendations.
            </p>

            <span>
              Updates Soon 🚀
            </span>

          </div>

        </div>

      </div>
    </>
  );
  const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/auth";
};
}

<button
  onClick={handleLogout}
  style={{
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Logout
</button>
export default Home;