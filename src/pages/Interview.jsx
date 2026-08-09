import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/interview.css";
import {
    FaMicrophone,
    FaArrowRight,
    FaClock,
    FaStop,
} from "react-icons/fa";

import "../styles/transitions.css";
import { API_BASE_URL } from "../config";

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
                    `${API_BASE_URL}/interview/start`
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
                <div style={{ fontSize: 60 }}>🎙️</div>
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
                    <div>
                        <h1>AI Mock Interview</h1>
                        <p className="interview-sub">
                            Powered by AI • Speak naturally, we'll transcribe live
                        </p>
                    </div>

                    <div className="interview-header-right">
                        <div className="ai-badge">
                            <span className="ai-dot" /> AI Active
                        </div>
                        <div className="timer">
                            <FaClock /> {minutes}:{seconds}
                        </div>
                    </div>
                </div>

                {/* Focused Interview Card */}
                <div className="interview-card-wrap">

                    <div className="interview-card">

                        {/* Question header */}
                        <div className="iq-question-head">
                            <span className="iq-step">Question {index + 1}</span>
                            <span className="iq-count">
                                {index + 1} / {questions.length}
                            </span>
                        </div>

                        {/* AI Question */}
                        <div className="question-box" key={index}>
                            <div className="ai-tag">
                                <FaMicrophone /> AI-Written Question
                            </div>
                            <h3>{questions[index]}</h3>
                        </div>

                        {/* Speech-to-Text live textbox */}
                        <div className="speech-area-label">
                            🗣️ Your live answer appears here
                        </div>

                        {speechSupported ? (
                            <>
                                <div className="transcript-box">
                                    {listening && (
                                        <div className="recording-indicator">
                                            <FaMicrophone /> Listening... speak now
                                        </div>
                                    )}
                                    <p style={{ marginTop: listening ? 8 : 0 }}>
                                        {transcript || (
                                            <span className="transcript-placeholder">
                                                {listening
                                                    ? "I'm listening… what would you say?"
                                                    : "Press Start Speaking and your answer will appear here in real time."}
                                            </span>
                                        )}
                                        {interim && (
                                            <span style={{ color: "#16a34a" }}>
                                                {" "}
                                                {interim}
                                            </span>
                                        )}
                                    </p>
                                </div>

                                <div className="speech-buttons">
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

                                    <button
                                        onClick={nextQuestion}
                                        className="interview-btn next-btn"
                                    >
                                        Next Question
                                        <FaArrowRight style={{ marginLeft: "10px" }} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="transcript-box">
                                    <p>
                                        <span className="transcript-placeholder">
                                            Speech recognition is not supported in this
                                            browser.
                                        </span>
                                    </p>
                                </div>
                                <p style={{ color: "#f87171", margin: "10px 0", textAlign: "center" }}>
                                    ⚠️ Please use Chrome or Edge for voice input.
                                </p>
                                <button
                                    onClick={nextQuestion}
                                    className="interview-btn next-btn"
                                >
                                    Next Question
                                    <FaArrowRight style={{ marginLeft: "10px" }} />
                                </button>
                            </>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Interview;
