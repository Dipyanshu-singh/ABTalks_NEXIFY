import { Link, useLocation } from "react-router-dom";
import { FaRobot } from "react-icons/fa";
import logo from "../assets/qora-logo.png";
const Navbar = () => {
    const location = useLocation();

    const activeStyle = {
        color: "#7c3aed",
        borderBottom: "2px solid #7c3aed",
    };

    return (
        <nav
            className="glass"
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "18px 40px",
                marginBottom: "30px",
            }}
        >
            {/* Logo */}
            <Link
                to="/home"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    textDecoration: "none",
                }}
            >
                <img
                    src={logo}
                    alt="QORA"
                    style={{
                        width: "140px",
                        height: "auto",
                    }}
                />
            </Link>

            {/* Navigation */}
            <div
                className="nav-links"
                style={{
                    display: "flex",
                    gap: "25px",
                    alignItems: "center",
                }}
            >
                <Link
                    to="/home"
                    style={location.pathname === "/home" ? activeStyle : {}}
                >
                    Home
                </Link>

                <Link
                    to="/resume"
                    style={location.pathname === "/resume" ? activeStyle : {}}
                >
                    Resume
                </Link>

                <Link
                    to="/interview"
                    style={location.pathname === "/interview" ? activeStyle : {}}
                >
                    Interview
                </Link>

                <Link
                    to="/dashboard"
                    style={location.pathname === "/dashboard" ? activeStyle : {}}
                >
                    Results
                </Link>

                <Link
                    to="/"
                    className="btn btn-outline"
                    style={{
                        padding: "8px 18px",
                    }}
                >
                    Logout
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;