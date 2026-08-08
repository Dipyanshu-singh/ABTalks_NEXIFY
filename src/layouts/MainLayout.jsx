import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout() {
    return (
        <div className="app-bg">
            {/* Floating aurora orbs */}
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />

            <div className="layout">
                <Sidebar />

                <div className="content">
                    <Navbar />
                    <main className="main-content">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}
