import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/interview.css";
import {
    FaMicrophone,
    FaVideo,
    FaArrowRight,
    FaStopCircle,
    FaClock,
    FaStop,
} from "react-icons/fa";

const Interview = () => {
    const navigate = useNavigate();

    const [index, setIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState(300);

    // ---- Speech-to-Text State ----
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [interim, setInterim] = useState("");
    const [speechSupported, setSpeechSupported] = useState(true);

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    useEffect(() => {
        if (!recognition) {
            setSpeechSupported(false);
            return;
        }
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
            let interimText = "";
            let finalText = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                if (result.isFinal) {
                    finalText += result[0].transcript;
                } else {
                    interimText += result[0].transcript;
                }
            }
            if (finalText) {
                setTranscript((prev) => (prev ? prev + " " + finalText : finalText));
            }
            setInterim(interimText);
        };

        recognition.onerror = (event) => {
            console.log("Speech error:", event.error);
            setListening(false);
        };

        recognition.onend = () => {
            setListening(false);
        };
    }, [recognition]);

    // ---- Questions fetch (Gemini API intact) ----
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

    // ---- Timer ----
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

    // ---- Speech-to-Text handlers ----
    const startListening = () => {
        if (!recognition) return;
        setTranscript("");
        setInterim("");
        setListening(true);
        recognition.start();
    };

    const stopListening = () => {
        if (!recognition) return;
        setListening(false);
        recognition.stop();
    };

    const nextQuestion = () => {
        stopListening();
        if (index < questions.length - 1) {
            setIndex(index + 1);
        } else {
            navigate("/dashboard");
        }
    };

    if (loading) {
        return (
            <div className="interview-page" style={{ textAlign: "center", paddingTop: 80 }}>
                <div style={{ fontSize: 60 }}>🤖</div>
                <h2 style={{ marginTop: 20 }}>Loading AI Interview...</h2>
            </div>
        );
    }

    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");

    return (
        <div className="app-bg">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />

            <div className="interview-page">

                {/* Header */}
                <div className="interview-header">
                    <h1>AI Mock Interview</h1>

                    <div className="timer">
                        <FaClock /> {minutes}:{seconds}
                    </div>
                </div>

                {/* Video & Question */}
                <div className="interview-grid">

                    {/* Webcam */}
                    <div className="card">
                        <div style={{ textAlign: "center", paddingTop: 40 }}>
                            <FaVideo
                                style={{
                                    fontSize: "80px",
                                    color: "#7c3aed",
                                }}
                            />
                            <h2 style={{ marginTop: 20 }}>Camera Preview</h2>
                            <p style={{ color: "#9ca3af" }}>
                                Webcam integration can be added later.
                            </p>
                        </div>
                    </div>

                    {/* Question */}
                    <div className="card">

                        <h2 style={{ marginBottom: 20 }}>
                            Question {index + 1}
                        </h2>

                        <div className="question-box">
                            <h3>{questions[index]}</h3>
                        </div>

                        {/* Speech-to-Text controls */}
                        {speechSupported ? (
                            <>
                                <div className="transcript-box">
                                    {listening && (
                                        <div className="recording-indicator">
                                            <FaMicrophone /> Listening...
                                        </div>
                                    )}
                                    <p style={{ marginTop: listening ? 8 : 0 }}>
                                        {transcript}
                                        {interim && (
                                            <span style={{ color: "#8b5cf6" }}>
                                                {" "}
                                                {interim}
                                            </span>
                                        )}
                                    </p>
                                </div>

                                {!listening ? (
                                    <button
                                        className="interview-btn primary-btn"
                                        onClick={startListening}
                                    >
                                        <FaMicrophone />
                                        &nbsp; Start Speaking
                                    </button>
                                ) : (
                                    <button
                                        className="interview-btn secondary-btn"
                                        onClick={stopListening}
                                    >
                                        <FaStop />
                                        &nbsp; Stop Recording
                                    </button>
                                )}
                            </>
                        ) : (
                            <p style={{ color: "#f87171", margin: "15px 0" }}>
                                ⚠️ Speech recognition is not supported in this
                                browser. Please use Chrome or Edge.
                            </p>
                        )}

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
