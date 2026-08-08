import { Link, useLocation } from "react-router-dom";
import {
    FaHome,
    FaFileAlt,
    FaBriefcase,
    FaComments,
    FaHistory,
    FaUser
} from "react-icons/fa";

import "./Sidebar.css";

export default function Sidebar() {

    const location = useLocation();

    const menu = [
        { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
        { name: "Resume", icon: <FaFileAlt />, path: "/resume" },
        { name: "Job Matcher", icon: <FaBriefcase />, path: "/job-matcher" },
        { name: "Interview", icon: <FaComments />, path: "/interview" },
        { name: "History", icon: <FaHistory />, path: "/history" },
        { name: "Profile", icon: <FaUser />, path: "/profile" }
    ];

    return (

        <div className="sidebar">

<h1 className="logo">🤖 InterviewIQ</h1>

            {menu.map(item => (

                <Link
                    key={item.path}
                    to={item.path}
                    className={
                        location.pathname === item.path
                            ? "active"
                            : ""
                    }
                >
                    {item.icon}
                    <span>{item.name}</span>
                </Link>

            ))}

        </div>

    );

}