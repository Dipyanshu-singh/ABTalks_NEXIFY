import { Link } from "react-router-dom";
import logo from "../assets/qora-logo.png";
import {
    FaFileUpload,
    FaMicrophone,
    FaChartLine,
    FaUserCircle,
} from "react-icons/fa";

const Home = () => {
    return (
        <div className="app-bg">
            {/* Navbar */}
            <nav className="glass">
                <img
                    src={logo}
                    alt="QORA"
                    style={{
                        width: "140px",
                        height: "auto",
                    }}
                />

                <div className="nav-links">
                    <Link to="/home">Home</Link>
                    <Link to="/resume">Resume</Link>
                    <Link to="/interview">Interview</Link>
                    <Link to="/dashboard">Results</Link>
                    <Link to="/">Logout</Link>
                </div>
            </nav>

            <div className="container" style={{ padding: "40px 0" }}>
                {/* Hero */}
                <div
                    className="glass card fade-in"
                    style={{
                        padding: "50px",
                        textAlign: "center",
                        marginBottom: "40px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "25px",
                        }}
                    >
                        <img
                            src={logo}
                            alt="QORA"
                            style={{
                                width: "220px",
                                height: "auto",
                                objectFit: "contain",
                            }}
                        />
                    </div>

                    <h1 className="title">Welcome to AI Interview Portal</h1>

                    <p className="subtitle">
                        Practice interviews, upload your resume, improve your communication,
                        and receive AI-powered feedback.
                    </p>

                    <Link to="/interview">
                        <button className="btn btn-primary">
                            Start Interview
                        </button>
                    </Link>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-3">
                    <div className="glass card">
                        <FaFileUpload
                            style={{
                                fontSize: "40px",
                                color: "#06b6d4",
                                marginBottom: "15px",
                            }}
                        />

                        <h2>Resume Upload</h2>

                        <p style={{ color: "#b3b3b3", margin: "15px 0" }}>
                            Upload your resume before beginning your interview.
                        </p>

                        <Link to="/resume">
                            <button className="btn btn-primary">
                                Upload Resume
                            </button>
                        </Link>
                    </div>

                    <div className="glass card">
                        <FaMicrophone
                            style={{
                                fontSize: "40px",
                                color: "#7c3aed",
                                marginBottom: "15px",
                            }}
                        />

                        <h2>Mock Interview</h2>

                        <p style={{ color: "#b3b3b3", margin: "15px 0" }}>
                            Answer AI-generated technical questions in real time.
                        </p>

                        <Link to="/interview">
                            <button className="btn btn-primary">
                                Start
                            </button>
                        </Link>
                    </div>

                    <div className="glass card">
                        <FaChartLine
                            style={{
                                fontSize: "40px",
                                color: "#22c55e",
                                marginBottom: "15px",
                            }}
                        />

                        <h2>Performance</h2>

                        <p style={{ color: "#b3b3b3", margin: "15px 0" }}>
                            View scores, AI feedback, confidence level, and analytics.
                        </p>

                        <Link to="/dashboard">
                            <button className="btn btn-primary">
                                Dashboard
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Statistics */}
                <div
                    className="grid grid-3"
                    style={{ marginTop: "45px" }}
                >
                    <div className="glass card" style={{ textAlign: "center" }}>
                        <FaUserCircle
                            style={{
                                fontSize: "45px",
                                color: "#7c3aed",
                            }}
                        />
                        <h1 style={{ marginTop: "15px" }}>25+</h1>
                        <p>Interviews Completed</p>
                    </div>

                    <div className="glass card" style={{ textAlign: "center" }}>
                        <h1
                            style={{
                                fontSize: "55px",
                                color: "#06b6d4",
                            }}
                        >
                            92%
                        </h1>
                        <p>Average Score</p>
                    </div>

                    <div className="glass card" style={{ textAlign: "center" }}>
                        <h1
                            style={{
                                fontSize: "55px",
                                color: "#22c55e",
                            }}
                        >
                            4.9★
                        </h1>
                        <p>User Rating</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;