import { Link } from "react-router-dom";
import logo from "../assets/qora-logo.png";

function Landing() {
    return (
        <div className="landing">

            {/* Navbar */}
            <nav className="landing-nav">

                <img src={logo} alt="QORA" className="landing-logo" />

                <div>
                    <Link to="/auth">
                        <button className="login-btn">
                            Login / Sign Up
                        </button>
                    </Link>
                </div>

            </nav>

            {/* Hero Section */}

            <section className="hero">

                <h1>
                    Ace Every Interview with <span>AI</span>
                </h1>

                <p>
                    Upload your resume, practice AI interviews,
                    receive personalized feedback, and land your
                    dream job.
                </p>

                <Link to="/auth">
                    <button className="hero-btn">
                        Get Started
                    </button>
                </Link>

            </section>

            {/* Resume Analysis */}

            <section className="feature">

                <div className="feature-text">

                    <h2>📄 Smart Resume Analysis</h2>

                    <p>
                        Upload your resume and let QORA analyze it using AI.
                        Get ATS compatibility, skill extraction, keyword
                        suggestions, and personalized improvements before
                        your interview.
                    </p>

                    <ul>
                        <li>✔ ATS Score</li>
                        <li>✔ Missing Keywords</li>
                        <li>✔ Resume Suggestions</li>
                        <li>✔ Skill Detection</li>
                    </ul>

                </div>

                <div className="feature-image">

                    <div className="mock-card">
                        <h3>Resume Score</h3>

                        <h1>92%</h1>

                        <p>Excellent ATS Compatibility</p>
                    </div>

                </div>

            </section>

            {/* AI Interview */}

            <section className="feature reverse">

                <div className="feature-image">

                    <div className="mock-card">

                        <h3>Interview Room</h3>

                        <h1>🎤</h1>

                        <p>AI Interview in Progress...</p>

                        <br />

                        <button className="hero-btn">
                            Answer Question
                        </button>

                    </div>

                </div>

                <div className="feature-text">

                    <h2>🎤 AI Mock Interview</h2>

                    <p>
                        Experience a real interview environment with our AI interviewer.
                        Answer HR and technical questions, improve your communication,
                        and gain confidence before your actual interview.
                    </p>

                    <ul>
                        <li>✔ HR Interview</li>
                        <li>✔ Technical Questions</li>
                        <li>✔ Voice Recognition</li>
                        <li>✔ Webcam Support</li>
                        <li>✔ Interview Timer</li>
                    </ul>

                </div>

            </section>

            {/* Performance Dashboard */}

            <section className="feature">

                <div className="feature-text">

                    <h2>📊 AI Performance Analytics</h2>

                    <p>
                        Every interview is analyzed in detail. QORA evaluates your
                        communication, technical knowledge, confidence, grammar, and
                        overall performance to help you improve continuously.
                    </p>

                    <ul>
                        <li>✔ Technical Skills</li>
                        <li>✔ Communication Score</li>
                        <li>✔ Confidence Analysis</li>
                        <li>✔ Grammar Check</li>
                        <li>✔ Overall Performance</li>
                    </ul>

                </div>

                <div className="feature-image">

                    <div className="analytics-card">

                        <h3>Your Interview Score</h3>

                        <div className="score-row">
                            <span>Technical</span>
                            <span>90%</span>
                        </div>

                        <div className="progress">
                            <div className="progress-fill" style={{ width: "90%" }}></div>
                        </div>

                        <div className="score-row">
                            <span>Communication</span>
                            <span>95%</span>
                        </div>

                        <div className="progress">
                            <div className="progress-fill" style={{ width: "95%" }}></div>
                        </div>

                        <div className="score-row">
                            <span>Confidence</span>
                            <span>91%</span>
                        </div>

                        <div className="progress">
                            <div className="progress-fill" style={{ width: "91%" }}></div>
                        </div>

                    </div>

                </div>

            </section>

            {/* AI Feedback */}

            <section className="feature reverse">

                <div className="feature-image">

                    <div className="feedback-card">

                        <h2>AI Feedback</h2>

                        <div className="feedback-box good">
                            <h4>✅ Strengths</h4>
                            <p>Excellent communication</p>
                            <p>Strong technical concepts</p>
                        </div>

                        <div className="feedback-box bad">
                            <h4>⚠ Improvements</h4>
                            <p>Answer with more examples</p>
                            <p>Reduce pauses while speaking</p>
                        </div>

                        <div className="feedback-box">
                            <h4>⭐ Overall Rating</h4>
                            <h1 style={{ color: "#7c3aed" }}>9.2 / 10</h1>
                        </div>

                    </div>

                </div>

                <div className="feature-text">

                    <h2>🤖 Personalized AI Feedback</h2>

                    <p>
                        Every interview is reviewed by AI. Receive detailed feedback on your
                        answers, communication style, technical knowledge, confidence, and
                        interview performance so you know exactly where to improve.
                    </p>

                    <ul>
                        <li>✔ Instant Feedback</li>
                        <li>✔ AI Suggestions</li>
                        <li>✔ Personalized Improvement Plan</li>
                        <li>✔ Strength & Weakness Analysis</li>
                    </ul>

                </div>

            </section>
            {/* Why Choose QORA */}

            <section className="why">

                <h2>Why Choose QORA?</h2>

                <p className="why-sub">
                    Everything you need to prepare for your dream interview in one platform.
                </p>

                <div className="why-grid">

                    <div className="why-card">
                        <h3>📄 Resume Analyzer</h3>
                        <p>
                            Improve your resume using AI suggestions and ATS optimization.
                        </p>
                    </div>

                    <div className="why-card">
                        <h3>🎤 AI Interview</h3>
                        <p>
                            Practice HR and technical interviews with an intelligent AI interviewer.
                        </p>
                    </div>

                    <div className="why-card">
                        <h3>💻 Coding Round</h3>
                        <p>
                            Solve coding questions with a built-in code editor.
                        </p>
                    </div>

                    <div className="why-card">
                        <h3>📊 Analytics</h3>
                        <p>
                            Track your progress using detailed performance analytics.
                        </p>
                    </div>

                    <div className="why-card">
                        <h3>🤖 AI Feedback</h3>
                        <p>
                            Receive personalized strengths, weaknesses, and improvement tips.
                        </p>
                    </div>

                    <div className="why-card">
                        <h3>📑 Reports</h3>
                        <p>
                            Download detailed interview reports and monitor your growth.
                        </p>
                    </div>

                </div>

            </section>
        </div>
    );
}

export default Landing;