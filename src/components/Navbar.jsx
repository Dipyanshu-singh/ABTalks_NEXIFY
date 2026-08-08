import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  // Backend can later replace this with real authentication state
  const isLoggedIn = false;

  const handleLogout = () => {
    // TODO: Backend logout API
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav className="w-full border-b border-white/10 bg-[#071A33]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-white"
        >
          Inter<span className="text-cyan-400">View</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            to="/"
            className="text-sm text-gray-300 transition hover:text-cyan-400"
          >
            Home
          </Link>

          {isLoggedIn && (
            <>
              <Link
                to="/upload-resume"
                className="text-sm text-gray-300 transition hover:text-cyan-400"
              >
                Resume
              </Link>

              <Link
                to="/interview"
                className="text-sm text-gray-300 transition hover:text-cyan-400"
              >
                Interview
              </Link>

              <Link
                to="/results"
                className="text-sm text-gray-300 transition hover:text-cyan-400"
              >
                Results
              </Link>
            </>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">

          {isLoggedIn ? (
            <>
              <FaUserCircle className="text-2xl text-cyan-400" />

              <button
                onClick={handleLogout}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-cyan-400 hover:text-cyan-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-300 hover:text-cyan-400"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-[#071A33] transition hover:bg-cyan-300"
              >
                Sign Up
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;