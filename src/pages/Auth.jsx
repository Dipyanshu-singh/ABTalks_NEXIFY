import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/qora-logo.png";
import {
    FaUser,
    FaLock,
    FaEnvelope,
    FaUserPlus,
    FaSignInAlt,
} from "react-icons/fa";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Replace with backend authentication later
        navigate("/home");
    };

    return (
        <div className="app-bg">
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "40px",
                }}
            >
                <div className="landing">

                    {/* Left Side */}

                    <div className="hero">

                        <img src={logo} className="heroLogo" />

                        <h1>
                            Welcome to <span>QORA</span>
                        </h1>

                        <p>
                            Quality Opportunity & Recruitment Assistant
                        </p>

                        <button className="btn">
                            Explore Platform
                        </button>

                    </div>

                    {/* Right Side */}

                    <div className="loginCard">

                        {/* Login & Signup Form */}

                    </div>

                </div>
                {/* Left Panel */}
                <div
                    style={{
                        padding: "60px 45px",
                        background:
                            "linear-gradient(160deg,#6d28d9 0%, #0f172a 60%, #0891b2 100%)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        color: "#fff",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "42px",
                            marginBottom: "15px",
                            fontWeight: "700",
                        }}
                    >
                        AI Interview
                    </h1>

                    <p
                        style={{
                            color: "#d1d5db",
                            lineHeight: "1.8",
                            marginBottom: "30px",
                        }}
                    >
                        Practice technical interviews, upload your resume, receive AI
                        feedback, and improve your confidence.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "30px",
                        }}
                    >
                        <img
                            src={logo}
                            alt="QORA Logo"
                            style={{
                                width: "250px",
                                height: "auto",
                                objectFit: "contain",
                            }}
                        />
                    </div>
                </div>

                {/* Right Panel */}
                <div
                    style={{
                        padding: "50px 40px",
                    }}
                >
                    <h2
                        style={{
                            textAlign: "center",
                            marginBottom: "25px",
                        }}
                    >
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div style={{ position: "relative" }}>
                                <FaUser
                                    style={{
                                        position: "absolute",
                                        top: "27px",
                                        left: "15px",
                                        color: "#7c3aed",
                                    }}
                                />
                                <input
                                    className="input"
                                    style={{ paddingLeft: "45px" }}
                                    type="text"
                                    placeholder="Full Name"
                                    required
                                />
                            </div>
                        )}

                        <div style={{ position: "relative" }}>
                            <FaEnvelope
                                style={{
                                    position: "absolute",
                                    top: "27px",
                                    left: "15px",
                                    color: "#7c3aed",
                                }}
                            />
                            <input
                                className="input"
                                style={{ paddingLeft: "45px" }}
                                type="email"
                                placeholder="Email Address"
                                required
                            />
                        </div>

                        <div style={{ position: "relative" }}>
                            <FaLock
                                style={{
                                    position: "absolute",
                                    top: "27px",
                                    left: "15px",
                                    color: "#7c3aed",
                                }}
                            />
                            <input
                                className="input"
                                style={{ paddingLeft: "45px" }}
                                type="password"
                                placeholder="Password"
                                required
                            />
                        </div>

                        {!isLogin && (
                            <div style={{ position: "relative" }}>
                                <FaLock
                                    style={{
                                        position: "absolute",
                                        top: "27px",
                                        left: "15px",
                                        color: "#7c3aed",
                                    }}
                                />
                                <input
                                    className="input"
                                    style={{ paddingLeft: "45px" }}
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                width: "100%",
                                marginTop: "15px",
                            }}
                        >
                            {isLogin ? (
                                <>
                                    <FaSignInAlt /> Login
                                </>
                            ) : (
                                <>
                                    <FaUserPlus /> Sign Up
                                </>
                            )}
                        </button>
                    </form>

                    <div
                        style={{
                            marginTop: "25px",
                            textAlign: "center",
                        }}
                    >
                        {isLogin ? (
                            <>
                                Don't have an account?{" "}
                                <span
                                    onClick={() => setIsLogin(false)}
                                    style={{
                                        color: "#8b5cf6",
                                        cursor: "pointer",
                                        fontWeight: "600",
                                    }}
                                >
                                    Sign Up
                                </span>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <span
                                    onClick={() => setIsLogin(true)}
                                    style={{
                                        color: "#8b5cf6",
                                        cursor: "pointer",
                                        fontWeight: "600",
                                    }}
                                >
                                    Login
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Auth;