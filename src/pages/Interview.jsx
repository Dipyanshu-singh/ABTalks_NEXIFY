import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/interview.css";
import {
    FaMicrophone,
    FaVideo,
    FaArrowRight,
    FaStopCircle,
    FaClock,
} from "react-icons/fa";



const Interview = () => {
    const navigate = useNavigate();

    const [index, setIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState(300);
    useEffect(() => {
        async function loadQuestions() {

            try {

                const res = await fetch(
                    "http://127.0.0.1:8000/interview/start"
                );

                const data = await res.json();

                setQuestions(data.questions);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        }

        loadQuestions();

    }, []);
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
    if (loading) {
        return <h2>Loading AI Interview...</h2>;
    }
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");

    return (
        <div className="app-bg">



            <div className="interview-page">

                {/* Header */}
                <div className="interview-header">
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
                <div className="interview-grid">

                    {/* Webcam */}
                    <div className="card">
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

                        <div className="card camera-box">
                            <h3>{questions[index]}</h3>
                        </div>

                        <button
                            className="interview-btn primary-btn"
                        >
                            <FaMicrophone />
                            &nbsp; Start Speaking
                        </button>

                        <button
                            className="interview-btn secondary-btn"
                        >
                            <FaStopCircle />
                            &nbsp; Stop Recording
                        </button>

                        <button
                            onClick={nextQuestion}
                            className="interview-btn primary-btn"
                        
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