import { Link, useLocation } from "react-router-dom";
import logo from "../assets/qora-logo.png";
import "./Navbar.css";

import {
  FaHome,
  FaFileAlt,
  FaBriefcase,
  FaComments,
  FaHistory,
  FaUser,
  FaChartBar,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

function Navbar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Resume", icon: <FaFileAlt />, path: "/resume" },
    { name: "Job Matcher", icon: <FaBriefcase />, path: "/job-matcher" },
    { name: "Interview", icon: <FaComments />, path: "/interview" },
    { name: "History", icon: <FaHistory />, path: "/history" },
    { name: "Results", icon: <FaChartBar />, path: "/analytics" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
  ];

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

        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? "active-link" : ""}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}

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
