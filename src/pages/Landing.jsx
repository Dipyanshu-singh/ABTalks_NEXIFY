import { Link } from "react-router-dom";
import logo from "../assets/qora-logo.png";

function Landing() {
    return (
        <div className="landing">

            {/* Navbar */}
            <nav className="landing-nav">

                <Link to="/">
                    <img
                        src={logo}
                        alt="QORA"
                        className="landing-logo"
                    />
                </Link>

                <div className="landing-right">

                    <Link to="/auth">
                        <button className="login-btn">
                            Login
                        </button>
                    </Link>

                    <Link to="/auth">
                        <button className="signup-btn">
                            Sign Up
                        </button>
                    </Link>

                </div>

            </nav>

            {/* Hero Section */}

            <section className="hero">

                <div className="hero-left">

                    <h1>
                        Ace Every Interview with <span>AI</span>
                    </h1>

                    <p>
                        Upload your resume, practice AI-powered interviews,
                        receive detailed AI feedback and improve your
                        communication before the real interview.
                    </p>

                </div>

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



            </section>

            {/* AI Interview */}

            <section className="feature reverse">



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



            </section>

            {/* AI Feedback */}

            <section className="feature reverse">



                <div className="feature-text">

                    <h2>Personalized AI Feedback</h2>

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
            {/* What You'll Get with QORA */}

            <section className="benefits">

                <h2>🚀 What You'll Get with QORA</h2>

                <p className="benefits-subtitle">
                    Everything you need to prepare, practice and succeed in your interviews.
                </p>

                <div className="benefits-grid">

                    <div className="benefit-card">
                        <div className="benefit-icon">📄</div>
                        <h3>Smart Resume Analysis</h3>
                        <p>
                            ATS score, keyword detection and AI-powered resume improvements.
                        </p>
                    </div>

                    <div className="benefit-card">
                        <div className="benefit-icon">🎤</div>
                        <h3>AI Mock Interview</h3>
                        <p>
                            HR, Technical and Mixed interview practice with AI.
                        </p>
                    </div>

                    <div className="benefit-card">
                        <div className="benefit-icon">🤖</div>
                        <h3>Personalized Feedback</h3>
                        <p>
                            Confidence, communication and technical evaluation after every interview.
                        </p>
                    </div>

                    <div className="benefit-card">
                        <div className="benefit-icon">📊</div>
                        <h3>Performance Analytics</h3>
                        <p>
                            Track interview scores, strengths and improvement trends.
                        </p>
                    </div>

                    <div className="benefit-card">
                        <div className="benefit-icon">📁</div>
                        <h3>Interview History</h3>
                        <p>
                            Access previous interviews and compare your progress.
                        </p>
                    </div>

                    <div className="benefit-card">
                        <div className="benefit-icon">📑</div>
                        <h3>Download Reports</h3>
                        <p>
                            Export AI interview reports and resume analysis as PDF.
                        </p>
                    </div>

                </div>

            </section>
            {/* ================= HOW QORA WORKS ================= */}

            <section className="workflow">

                <h2>⚡ How QORA Works</h2>

                <p className="workflow-subtitle">
                    Five simple steps to prepare for your dream interview.
                </p>

                <div className="workflow-container">

                    <div className="workflow-step">
                        <div className="step-number">1</div>
                        <h3>Upload Resume</h3>
                        <p>Upload your latest resume in PDF or DOCX format.</p>
                    </div>

                    <div className="workflow-arrow">→</div>

                    <div className="workflow-step">
                        <div className="step-number">2</div>
                        <h3>AI Resume Analysis</h3>
                        <p>Receive ATS score, keyword suggestions and improvements.</p>
                    </div>

                    <div className="workflow-arrow">→</div>

                    <div className="workflow-step">
                        <div className="step-number">3</div>
                        <h3>Start Interview</h3>
                        <p>Choose HR, Technical or Mixed interview mode.</p>
                    </div>

                    <div className="workflow-arrow">→</div>

                    <div className="workflow-step">
                        <div className="step-number">4</div>
                        <h3>AI Evaluation</h3>
                        <p>AI evaluates confidence, communication and answers.</p>
                    </div>

                    <div className="workflow-arrow">→</div>

                    <div className="workflow-step">
                        <div className="step-number">5</div>
                        <h3>Results Dashboard</h3>
                        <p>View analytics, reports and track your progress.</p>
                    </div>

                </div>

            </section>
            <section className="stats">

                <div className="stat-card">
                    <h2>10K+</h2>
                    <p>Interviews Practiced</p>
                </div>

                <div className="stat-card">
                    <h2>95%</h2>
                    <p>Resume ATS Accuracy</p>
                </div>

                <div className="stat-card">
                    <h2>5000+</h2>
                    <p>Students Helped</p>
                </div>

                <div className="stat-card">
                    <h2>24×7</h2>
                    <p>AI Available</p>
                </div>

            </section>
            {/* ================= TESTIMONIALS ================= */}

            <section className="testimonials">

                <h2>❤️ Loved by Students</h2>

                <p className="testimonial-sub">
                    Thousands of students are improving their interview skills with QORA.
                </p>

                <div className="testimonial-grid">

                    <div className="testimonial-card">
                        <h3>⭐⭐⭐⭐⭐</h3>

                        <p>
                            "The AI interview felt surprisingly real. It helped me improve my confidence before placements."
                        </p>

                        <h4>— CSE Student</h4>
                    </div>

                    <div className="testimonial-card">
                        <h3>⭐⭐⭐⭐⭐</h3>

                        <p>
                            "Resume analysis gave me ATS suggestions that helped me improve my resume significantly."
                        </p>

                        <h4>— Software Engineering Student</h4>
                    </div>

                    <div className="testimonial-card">
                        <h3>⭐⭐⭐⭐⭐</h3>

                        <p>
                            "The feedback after every interview helped me understand my weaknesses much better."
                        </p>

                        <h4>— Final Year Student</h4>
                    </div>

                </div>

            </section>
            {/* ================= FAQ ================= */}

            <section className="faq">

                <h2>Frequently Asked Questions</h2>

                <div className="faq-container">

                    <div className="faq-item">
                        <h3>Can I upload my own resume?</h3>
                        <p>
                            Yes. QORA supports PDF and DOCX resumes and provides AI-powered analysis.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3>Does QORA generate interview questions?</h3>
                        <p>
                            Yes. AI generates HR and technical questions based on your uploaded resume.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3>Can I view my previous interview reports?</h3>
                        <p>
                            Yes. All interview results, feedback and analytics are available in your dashboard.
                        </p>
                    </div>

                </div>

            </section>
            {/* ================= FINAL CTA ================= */}

            <section className="cta">

                <h2>Ready to Ace Your Next Interview?</h2>

                <p>
                    Join QORA today and practice with AI-powered interviews,
                    resume analysis, and personalized feedback.
                </p>

                <div className="cta-buttons">

                    <Link to="/auth">
                        <button className="cta-login">
                            Login
                        </button>
                    </Link>

                    <Link to="/auth">
                        <button className="cta-signup">
                            Sign Up
                        </button>
                    </Link>

                </div>

            </section>
            {/* ================= FOOTER ================= */}

            <footer className="footer">

                <img
                    src={logo}
                    alt="QORA"
                    className="footer-logo"
                />

                <p>
                    Quality Opportunity & Recruitment Assistant
                </p>

                <div className="footer-links">

                    <a href="#top">Home</a>

                    <a href="#features">Features</a>

                    <a href="#faq">FAQ</a>

                    <Link to="/auth">Login</Link>

                </div>

                <p className="copyright">
                    © 2026 QORA. All Rights Reserved.
                </p>

            </footer>
        </div>
    );
}

export default Landing;