import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/qora-logo.png";
import { FaGithub } from "react-icons/fa";
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

        if (isLogin) {
            // Login
            navigate("/dashboard");
        } else {
            // Signup
            alert("Account created successfully!");

            // Switch back to Login form
            setIsLogin(true);
        }
    };

    return (
        <div className="auth-page">

            {/* Logo */}
            <img src={logo} alt="QORA" className="top-logo" />

            {/* Welcome */}
            <div className="welcome-text">
                <h1>
                    Welcome to <span>QORA</span>
                </h1>

                <p>Quality Opportunity & Recruitment Assistant</p>
            </div>

            <div className="login-card">

                <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>

                <form onSubmit={handleSubmit}>

                    {!isLogin && (
                        <div className="input-group">
                            <FaUser className="input-icon" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                required
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <FaEnvelope className="input-icon" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <FaLock className="input-icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="input-group">
                            <FaLock className="input-icon" />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                required
                            />
                        </div>
                    )}
                    <div className="forgot-password">
                        <a href="#">Forgot Password?</a>
                    </div>

                    <button className="auth-btn" type="submit">
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
                    <button
                        type="button"
                        onClick={() => {
                            window.location.href = "https://abtalks-nexify-1.onrender.com/login/github";
                        }}
                        style={{
                            width: "100%",
                            marginTop: "15px",
                            background: "#24292e",
                            color: "white",
                            border: "none",
                            padding: "12px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontWeight: "600",
                        }}
                    >
                        <FaGithub style={{ marginRight: "8px" }} />
                        Continue with GitHub
                    </button>
                </form>
                <div className="divider">
                    <span>OR</span>
                </div>

                {isLogin ? (
                    <p>
                        Don't have an account?{" "}
                        <span
                            className="signup-link"
                            onClick={() => setIsLogin(false)}
                        >
                            Sign Up
                        </span>
                    </p>
                ) : (
                    <p>
                        Already have an account?{" "}
                        <span
                            className="signup-link"
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </span>
                    </p>
                )}

            </div>

        </div>
    );
};

export default Auth;