import { Link, useLocation } from "react-router-dom";
import logo from "../assets/qora-logo.png";
import "./Navbar.css";

import {
  FaHome,
  FaFileAlt,
  FaRobot,
  FaChartBar,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">

<div className="nav-left">

        <Link to="/dashboard" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src={logo}
            alt="InterviewIQ AI"
            className="navbar-logo"
          />
          <span style={{ fontWeight: 800, fontSize: 17, color: "#111827" }}>
            InterviewIQ AI
          </span>
        </Link>

      </div>

      <div className="nav-center">

        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active-link" : ""}
        >
          <FaHome />
          Home
        </Link>

        <Link
          to="/resume"
          className={location.pathname === "/resume" ? "active-link" : ""}
        >
          <FaFileAlt />
          Resume
        </Link>

        <Link
          to="/interview"
          className={location.pathname === "/interview" ? "active-link" : ""}
        >
          <FaRobot />
          Interview
        </Link>

        <Link
          to="/analytics"
          className={location.pathname === "/analytics" ? "active-link" : ""}
        >
          <FaChartBar />
          Results
        </Link>

      </div>

      <div className="nav-right">

        <FaUserCircle className="profile-icon" />

        <Link to="/">
          <button className="logout-btn">
            <FaSignOutAlt />
            Logout
          </button>
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;