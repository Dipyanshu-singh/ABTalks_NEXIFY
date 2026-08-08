import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  // =========================
  // FORM VARIABLES
  // =========================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // =========================
  // BACKEND VARIABLES
  // =========================

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Backend can return these later
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // =========================
  // LOGIN FUNCTION
  // =========================

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      /*
        BACKEND CONNECTION

        Replace this URL with your backend URL.

        Example:
        POST http://localhost:5000/api/auth/login

        Expected backend response:

        {
          "token": "JWT_TOKEN",
          "user": {
            "id": "123",
            "name": "Bhoomika",
            "email": "example@gmail.com",
            "role": "candidate"
          }
        }
      */

      const API_URL = "http://localhost:5000/api/auth/login";

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // =========================
      // SAVE BACKEND DATA
      // =========================

      setToken(data.token);
      setUser(data.user);

      // Save token for future API requests
      localStorage.setItem("token", data.token);

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // =========================
      // REDIRECT
      // =========================

      navigate("/upload");

    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#081C3A] relative overflow-hidden flex items-center justify-center px-6">

      {/* =========================
          BACKGROUND EFFECTS
      ========================= */}

      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

      {/* =========================
          LOGIN CARD
      ========================= */}

      <div className="relative w-full max-w-md">

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">

          {/* Logo */}

          <div className="text-center mb-8">

            <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20">

              <span className="text-white text-2xl font-bold">
                AI
              </span>

            </div>

            <h1 className="text-3xl font-bold text-white">
              Welcome Back
            </h1>

            <p className="text-gray-400 mt-2">
              Sign in to continue your interview journey
            </p>

          </div>

          {/* =========================
              ERROR MESSAGE
          ========================= */}

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* =========================
              FORM
          ========================= */}

          <form onSubmit={handleLogin}>

            {/* Email */}

            <div className="mb-5">

              <label className="block text-gray-200 text-sm font-medium mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl bg-[#0D2852] border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition"
              />

            </div>

            {/* Password */}

            <div className="mb-3">

              <div className="flex justify-between items-center mb-2">

                <label className="text-gray-200 text-sm font-medium">
                  Password
                </label>

                <button
                  type="button"
                  className="text-cyan-400 text-sm hover:text-cyan-300 transition"
                  onClick={() => {
                    // Backend integration later
                    console.log("Forgot password clicked");
                  }}
                >
                  Forgot password?
                </button>

              </div>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-[#0D2852] border border-white/10 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>

            {/* Remember Me */}

            <div className="flex items-center gap-2 mb-6">

              <input
                type="checkbox"
                id="remember"
                className="accent-cyan-400"
              />

              <label
                htmlFor="remember"
                className="text-sm text-gray-400"
              >
                Remember me
              </label>

            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-semibold flex items-center justify-center gap-3 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20 transition disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >

              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In
                  <FaArrowRight className="text-sm" />
                </>
              )}

            </button>

          </form>

          {/* =========================
              SIGN UP
          ========================= */}

          <div className="flex items-center gap-3 my-7">

            <div className="h-px bg-white/10 flex-1" />

            <span className="text-gray-500 text-sm">
              OR
            </span>

            <div className="h-px bg-white/10 flex-1" />

          </div>

          <p className="text-center text-gray-400 text-sm">

            Don't have an account?

            <Link
              to="/signup"
              className="ml-2 text-cyan-400 font-semibold hover:text-cyan-300 transition"
            >
              Create Account
            </Link>

          </p>

        </div>

        {/* Back to Home */}

        <div className="text-center mt-6">

          <Link
            to="/"
            className="text-gray-500 hover:text-gray-300 text-sm transition"
          >
            ← Back to Home
          </Link>

        </div>

      </div>

    </div>
  );
}