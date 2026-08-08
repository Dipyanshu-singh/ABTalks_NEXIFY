import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Interview from "./pages/Interview";
import Results from "./pages/Results";
import UploadResume from "./pages/UploadResume";
import RecruiterDashboard from "./pages/RecruiterDashboard";


function Home() {
  return (
    <div>

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <Link to="/" className="nav-logo">
          InterviewView
        </Link>

        <div className="nav-links">
          <Link to="/login">
            Login
          </Link>

          <Link to="/signup" className="nav-signup">
            Sign Up
          </Link>
        </div>

      </nav>


      {/* ================= HERO ================= */}

      <main className="hero">

        <div className="hero-content">

          {/* Badge */}

          <div className="hero-badge">
            ✦ AI-Powered Interview Platform
          </div>


          {/* Heading */}

          <h1>
            Prepare Smarter.
            <br />
            <span>Interview Better.</span>
          </h1>


          {/* Description */}

          <p className="hero-subtitle">
            Practice interviews with an AI-powered interviewer,
            get instant feedback, and understand where you can
            improve before the real interview.
          </p>


          {/* Buttons */}

          <div className="hero-buttons">

            <Link
              to="/signup"
              className="btn-primary"
            >
              Get Started →
            </Link>

            <Link
              to="/login"
              className="btn-secondary"
            >
              Login
            </Link>

          </div>


          {/* ================= FEATURES ================= */}

          <div className="features">

            {/* Card 1 */}

            <div className="feature-card">

              <div className="feature-icon">
                📄
              </div>

              <h3>
                Resume Analysis
              </h3>

              <p>
                Upload your resume and prepare for
                questions based on your profile.
              </p>

            </div>


            {/* Card 2 */}

            <div className="feature-card">

              <div className="feature-icon">
                🤖
              </div>

              <h3>
                AI Interview
              </h3>

              <p>
                Practice realistic technical and
                behavioral interview questions.
              </p>

            </div>


            {/* Card 3 */}

            <div className="feature-card">

              <div className="feature-icon">
                📊
              </div>

              <h3>
                Instant Feedback
              </h3>

              <p>
                Get scores, feedback and suggestions
                after your interview.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}


/* =====================================================
   APP ROUTER
===================================================== */

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Landing page */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* Authentication */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />


        {/* Candidate */}

        <Route
          path="/upload-resume"
          element={<UploadResume />}
        />

        <Route
          path="/interview"
          element={<Interview />}
        />

        <Route
          path="/results"
          element={<Results />}
        />


        {/* Recruiter */}

        <Route
          path="/recruiter-dashboard"
          element={<RecruiterDashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;