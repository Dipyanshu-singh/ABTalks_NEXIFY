import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  // Backend API
  const API_BASE_URL = "http://localhost:5000/api";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("candidate");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      // Backend connection
      const response = await fetch(
        `${API_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Signup failed."
        );
      }

      // Save backend data
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      // Redirect
      if (role === "recruiter") {
        navigate("/recruiter-dashboard");
      } else {
        navigate("/upload");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#081C3A] flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-md">

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

          {/* Heading */}
          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-white">
              Create Account
            </h1>

            <p className="text-gray-400 mt-2">
              Start your AI interview journey
            </p>

          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup}>

            {/* Name */}
            <div className="mb-4">

              <label className="block text-gray-300 mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0D2852] border border-white/10 text-white outline-none focus:border-cyan-400"
              />

            </div>

            {/* Email */}
            <div className="mb-4">

              <label className="block text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0D2852] border border-white/10 text-white outline-none focus:border-cyan-400"
              />

            </div>

            {/* Account Type */}
            <div className="mb-4">

              <label className="block text-gray-300 mb-2">
                Account Type
              </label>

              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  onClick={() => setRole("candidate")}
                  className={`py-3 rounded-xl border ${
                    role === "candidate"
                      ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                      : "border-white/10 bg-[#0D2852] text-gray-400"
                  }`}
                >
                  Candidate
                </button>

                <button
                  type="button"
                  onClick={() => setRole("recruiter")}
                  className={`py-3 rounded-xl border ${
                    role === "recruiter"
                      ? "border-cyan-400 bg-cyan-400/10 text-cyan-400"
                      : "border-white/10 bg-[#0D2852] text-gray-400"
                  }`}
                >
                  Recruiter
                </button>

              </div>

            </div>

            {/* Password */}
            <div className="mb-4">

              <label className="block text-gray-300 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0D2852] border border-white/10 text-white outline-none focus:border-cyan-400"
              />

            </div>

            {/* Confirm Password */}
            <div className="mb-6">

              <label className="block text-gray-300 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm your password"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#0D2852] border border-white/10 text-white outline-none focus:border-cyan-400"
              />

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-semibold disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          {/* Login */}
          <p className="text-center text-gray-400 mt-6">

            Already have an account?

            <Link
              to="/login"
              className="text-cyan-400 ml-2 hover:text-cyan-300"
            >
              Login
            </Link>

          </p>

        </div>

        {/* Home */}
        <div className="text-center mt-5">

          <Link
            to="/"
            className="text-gray-500 hover:text-gray-300 text-sm"
          >
            ← Back to Home
          </Link>

        </div>

      </div>

    </div>
  );
}