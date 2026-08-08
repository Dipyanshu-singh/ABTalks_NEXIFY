import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaArrowRight,
} from "react-icons/fa";

const Resume = () => {
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="app-bg">

      {/* Navbar */}
      <nav className="glass">
        <h2 className="logo">AI Interview</h2>

        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/resume">Resume</Link>
          <Link to="/interview">Interview</Link>
          <Link to="/dashboard">Results</Link>
        </div>
      </nav>

      <div
        className="container"
        style={{
          padding: "60px 0",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="glass card"
          style={{
            width: "100%",
            maxWidth: "700px",
            textAlign: "center",
          }}
        >
          <FaCloudUploadAlt
            style={{
              fontSize: "80px",
              color: "#7c3aed",
              marginBottom: "20px",
            }}
          />

          <h1 className="title">Upload Resume</h1>

          <p className="subtitle">
            Upload your latest resume in PDF or DOCX format.
          </p>

          <div className="upload-box">

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFile}
            />

            <p
              style={{
                marginTop: "20px",
                color: "#b3b3b3",
              }}
            >
              Supported Formats: PDF, DOC, DOCX
            </p>

          </div>

          {file && (
            <div
              className="glass"
              style={{
                marginTop: "30px",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
              }}
            >
              <FaFilePdf
                style={{
                  color: "red",
                  fontSize: "35px",
                }}
              />

              <div>
                <h3>{file.name}</h3>

                <p
                  style={{
                    color: "#a1a1aa",
                  }}
                >
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          )}

          <div
            style={{
              marginTop: "40px",
            }}
          >
            <Link to="/interview">
              <button className="btn btn-primary">
                Continue to Interview
                <FaArrowRight
                  style={{
                    marginLeft: "10px",
                  }}
                />
              </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Resume;
