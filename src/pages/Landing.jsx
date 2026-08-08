import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-[#071A33] text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5">

        <Link
          to="/"
          className="text-2xl font-bold"
        >
          Inter<span className="text-cyan-400">View</span>
        </Link>

        <div className="flex gap-4">

          <Link
            to="/login"
            className="rounded-lg px-5 py-2 text-gray-300 hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-cyan-400 px-5 py-2 font-semibold text-[#071A33] hover:bg-cyan-300"
          >
            Sign Up
          </Link>

        </div>

      </nav>


      {/* Hero */}
      <main className="flex min-h-[80vh] items-center justify-center px-6">

        <div className="max-w-3xl text-center">

          <div className="mb-6 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
            AI-Powered Interview Platform
          </div>

          <h1 className="text-5xl font-bold leading-tight md:text-6xl">

            Prepare Smarter.
            <br />

            <span className="text-cyan-400">
              Interview Better.
            </span>

          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">

            Practice interviews with an AI-powered interviewer,
            get instant feedback, and understand where you can
            improve before the real interview.

          </p>


          {/* Buttons */}
          <div className="mt-9 flex justify-center gap-4">

            <Link
              to="/signup"
              className="rounded-lg bg-cyan-400 px-7 py-3 font-semibold text-[#071A33] transition hover:bg-cyan-300"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="rounded-lg border border-white/20 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Login
            </Link>

          </div>


          {/* Features */}
          <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-semibold">
                📄 Resume Analysis
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Upload your resume and prepare for questions
                based on your profile.
              </p>
            </div>


            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-semibold">
                🤖 AI Interview
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Practice realistic technical and behavioral
                interview questions.
              </p>
            </div>


            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-semibold">
                📊 Instant Feedback
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Get scores, feedback and suggestions after
                your interview.
              </p>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Landing;