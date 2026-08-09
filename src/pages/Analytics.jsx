import { Link } from "react-router-dom";
import {
  FaAward,
  FaChartBar,
  FaRedo,
  FaDownload,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="app-bg fade-in">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Navbar */}
      <nav className="glass">
        <h2 className="logo">AI Interview</h2>

        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/resume">Resume</Link>
          <Link to="/interview">Interview</Link>
        </div>
      </nav>

      <div className="container" style={{ padding: "40px 0", position: "relative", zIndex: 2 }}>

        {/* Heading */}
        <div
          className="glass card"
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <FaAward
            style={{
              fontSize: "60px",
              color: "#FFD700",
            }}
          />

          <h1 className="title">Interview Results</h1>

          <p className="subtitle">
            Here's your AI-powered interview performance analysis.
          </p>
        </div>

        {/* Overall Score */}
        <div
          className="glass card"
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <div className="score-circle">
            <span>92%</span>
          </div>

          <h2 style={{ marginTop: "25px" }}>
            Excellent Performance 🎉
          </h2>

          <p
            style={{
              color: "#b3b3b3",
              marginTop: "10px",
            }}
          >
            You performed better than 87% of candidates.
          </p>
        </div>

        {/* Analytics */}
        <div className="grid grid-3">

          <div className="glass card">
            <FaChartBar
              style={{
                fontSize: "35px",
                color: "#06b6d4",
              }}
            />

            <h2 style={{ marginTop: "15px" }}>
              Technical
            </h2>

            <h1 style={{ color: "#06b6d4" }}>
              90%
            </h1>
          </div>

          <div className="glass card">
            <FaChartBar
              style={{
                fontSize: "35px",
                color: "#7c3aed",
              }}
            />

            <h2 style={{ marginTop: "15px" }}>
              Communication
            </h2>

            <h1 style={{ color: "#7c3aed" }}>
              95%
            </h1>
          </div>

          <div className="glass card">
            <FaChartBar
              style={{
                fontSize: "35px",
                color: "#22c55e",
              }}
            />

            <h2 style={{ marginTop: "15px" }}>
              Confidence
            </h2>

            <h1 style={{ color: "#22c55e" }}>
              91%
            </h1>
          </div>

        </div>

        {/* Strengths & Improvements */}
        <div
          className="grid grid-2"
          style={{ marginTop: "35px" }}
        >

          <div className="glass card">

            <h2 style={{ marginBottom: "20px" }}>
              Strengths
            </h2>

            <p><FaCheckCircle color="#22c55e" /> Strong communication</p>
            <br />

            <p><FaCheckCircle color="#22c55e" /> Good technical knowledge</p>
            <br />

            <p><FaCheckCircle color="#22c55e" /> Confident answers</p>

          </div>

          <div className="glass card">

            <h2 style={{ marginBottom: "20px" }}>
              Improvements
            </h2>

            <p><FaTimesCircle color="red" /> Explain concepts in more depth</p>
            <br />

            <p><FaTimesCircle color="red" /> Reduce pauses while answering</p>
            <br />

            <p><FaTimesCircle color="red" /> Give more real-world examples</p>

          </div>

        </div>

        {/* AI Feedback */}
        <div
          className="glass card"
          style={{
            marginTop: "35px",
          }}
        >
          <h2>💬 AI Feedback</h2>

          <p
            style={{
              color: "#cbd5e1",
              marginTop: "20px",
              lineHeight: "1.8",
            }}
          >
            You demonstrated excellent understanding of the technical
            questions and communicated your thoughts clearly. Continue
            practicing with real-world examples and improve answer depth
            for senior-level interviews.
          </p>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >

          <button className="btn btn-primary">
            <FaDownload />
            &nbsp; Download Report
          </button>

          <Link to="/interview">
            <button className="btn btn-outline">
              <FaRedo />
              &nbsp; Retake Interview
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;