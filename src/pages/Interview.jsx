import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import {
  FaMicrophone,
  FaVideo,
  FaArrowRight,
  FaStopCircle,
  FaClock,
} from "react-icons/fa";

const questions = [
  "Tell me about yourself.",
  "Explain the difference between HTML and React.",
  "What is Virtual DOM?",
  "Explain useState Hook.",
  "What are your strengths?",
];

const Interview = () => {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(300);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev === 0) {
          clearInterval(timer);
          navigate("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const nextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  return (
    <div className="app-bg">

      {/* Navbar */}
      <nav className="glass">
        <h2 className="logo">AI Interview</h2>

        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/resume">Resume</Link>
          <Link to="/dashboard">Results</Link>
        </div>
      </nav>

      <div className="container" style={{ padding: "40px 0" }}>

        {/* Header */}
        <div
          className="glass card"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h1>AI Mock Interview</h1>

          <div
            style={{
              color: "#06b6d4",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            <FaClock /> {minutes}:{seconds}
          </div>
        </div>

        {/* Video & Question */}
        <div className="grid grid-2">

          {/* Webcam */}
          <div
            className="glass card"
            style={{
              textAlign: "center",
              minHeight: "350px",
            }}
          >
            <FaVideo
              style={{
                fontSize: "80px",
                color: "#7c3aed",
                marginTop: "70px",
              }}
            />

            <h2 style={{ marginTop: "20px" }}>
              Camera Preview
            </h2>

            <p style={{ color: "#a1a1aa" }}>
              Webcam integration can be added later.
            </p>
          </div>

          {/* Question */}
          <div className="glass card">

            <h2 style={{ marginBottom: "20px" }}>
              Question {index + 1}
            </h2>

            <div
              className="question-box glass"
              style={{
                marginBottom: "25px",
              }}
            >
              <h3>{questions[index]}</h3>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: "100%", marginBottom: "15px" }}
            >
              <FaMicrophone />
              &nbsp; Start Speaking
            </button>

            <button
              className="btn btn-outline"
              style={{ width: "100%", marginBottom: "20px" }}
            >
              <FaStopCircle />
              &nbsp; Stop Recording
            </button>

            <button
              onClick={nextQuestion}
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              Next Question
              <FaArrowRight style={{ marginLeft: "10px" }} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Interview;