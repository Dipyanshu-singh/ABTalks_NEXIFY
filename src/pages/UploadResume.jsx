import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadResume() {
  const navigate = useNavigate();

  // ==========================================
  // BACKEND CONFIGURATION
  // ==========================================

  const API_BASE_URL = "http://localhost:5000/api";

  const token = localStorage.getItem("token");

  // ==========================================
  // STATE
  // ==========================================

  const [file, setFile] = useState(null);

  const [role, setRole] = useState("Frontend Developer");

  const [experience, setExperience] = useState("Fresher");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  // ==========================================
  // FILE SELECTION
  // ==========================================

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return;
    }

    setError("");

    // Maximum 5 MB
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB.");
      return;
    }

    // Allowed extensions
    const allowedExtensions = [
      ".pdf",
      ".doc",
      ".docx",
    ];

    const fileName = selectedFile.name.toLowerCase();

    const isValid = allowedExtensions.some((extension) =>
      fileName.endsWith(extension)
    );

    if (!isValid) {
      setError("Please upload a PDF, DOC, or DOCX file.");
      return;
    }

    setFile(selectedFile);
  };

  // ==========================================
  // REMOVE FILE
  // ==========================================

  const removeFile = () => {
    setFile(null);
    setError("");
    setSuccess(false);
  };

  // ==========================================
  // UPLOAD RESUME
  // ==========================================

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      setError("Please select your resume first.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      /*
        BACKEND ENDPOINT:

        POST /api/resume/upload

        Data being sent:

        resume
        role
        experience
      */

      const formData = new FormData();

      formData.append("resume", file);
      formData.append("role", role);
      formData.append("experience", experience);

      const response = await fetch(
        `${API_BASE_URL}/resume/upload`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Resume upload failed."
        );
      }

      // ========================================
      // SAVE BACKEND DATA
      // ========================================

      if (data.resumeId) {
        localStorage.setItem(
          "resumeId",
          data.resumeId
        );
      }

      if (data.interviewId) {
        localStorage.setItem(
          "interviewId",
          data.interviewId
        );
      }

      localStorage.setItem(
        "interviewRole",
        role
      );

      setSuccess(true);

      // Go to interview after upload
      setTimeout(() => {
        navigate("/interview");
      }, 1000);

    } catch (err) {
      console.error(err);

      setError(
        err.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-[#081C3A] text-white">

      {/* Background */}

      <div className="fixed top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="fixed bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}

      <header className="relative border-b border-white/10">

        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">

          <div>
            <h1 className="text-xl font-bold">
              AI Interview Agent
            </h1>

            <p className="text-cyan-400 text-sm">
              Resume Analysis
            </p>
          </div>

          <span className="text-gray-500 text-sm">
            Step 1 of 2
          </span>

        </div>

      </header>

      {/* Main */}

      <main className="relative max-w-3xl mx-auto px-6 py-12">

        {/* Heading */}

        <div className="text-center mb-10">

          <h2 className="text-4xl font-bold">
            Upload Your Resume
          </h2>

          <p className="text-gray-400 mt-3">
            Upload your resume so our AI can
            create a personalized interview.
          </p>

        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300">
            {error}
          </div>
        )}

        {/* Upload Box */}

        <div className="bg-white/5 border-2 border-dashed border-white/10 rounded-3xl p-10 text-center">

          {!file ? (
            <div>

              <div className="text-6xl mb-5">
                📄
              </div>

              <h3 className="text-xl font-semibold">
                Upload your resume
              </h3>

              <p className="text-gray-500 mt-2">
                PDF, DOC, or DOCX
              </p>

              <label className="inline-block mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold cursor-pointer hover:scale-105 transition">

                Choose File

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />

              </label>

              <p className="text-gray-600 text-xs mt-4">
                Maximum file size: 5 MB
              </p>

            </div>
          ) : (
            <div>

              <div className="text-5xl mb-4">
                📄
              </div>

              <h3 className="text-lg font-semibold break-all">
                {file.name}
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>

              <button
                type="button"
                onClick={removeFile}
                className="mt-5 text-red-400 hover:text-red-300"
              >
                Remove Resume
              </button>

            </div>
          )}

        </div>

        {/* Interview Preferences */}

        <div className="mt-6 bg-white/5 border border-white/10 rounded-3xl p-6">

          <h3 className="text-xl font-semibold mb-6">
            Interview Preferences
          </h3>

          {/* Job Role */}

          <div className="mb-5">

            <label className="block text-gray-300 text-sm mb-2">
              Target Job Role
            </label>

            <select
              value={role}
              onChange={(event) =>
                setRole(event.target.value)
              }
              className="w-full bg-[#0D2852] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Developer</option>
              <option>Python Developer</option>
              <option>Java Developer</option>
              <option>Data Analyst</option>
              <option>Other</option>
            </select>

          </div>

          {/* Experience */}

          <div>

            <label className="block text-gray-300 text-sm mb-2">
              Experience Level
            </label>

            <select
              value={experience}
              onChange={(event) =>
                setExperience(event.target.value)
              }
              className="w-full bg-[#0D2852] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option>Fresher</option>
              <option>0-1 Years</option>
              <option>1-3 Years</option>
              <option>3+ Years</option>
            </select>

          </div>

        </div>

        {/* Success */}

        {success && (
          <div className="mt-5 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400">
            Resume uploaded successfully! Starting
            your interview...
          </div>
        )}

        {/* Continue */}

        <form onSubmit={handleUpload}>

          <button
            type="submit"
            disabled={!file || loading}
            className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold hover:scale-[1.01] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Analyzing Resume..."
              : "Continue to Interview →"}
          </button>

        </form>

        {/* Back */}

        <button
          type="button"
          onClick={() => navigate("/")}
          className="block mx-auto mt-6 text-gray-500 hover:text-gray-300 text-sm"
        >
          ← Back to Home
        </button>

      </main>

    </div>
  );
}