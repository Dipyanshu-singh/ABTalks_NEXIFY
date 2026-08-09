import { useState } from "react";
import ATSDashboard from "../components/ATSDashboard";
import axios from "axios";

export default function Resume() {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] = useState(null);

    const uploadResume = async () => {

        if (!file) return alert("Choose a resume");

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);

            const res = await axios.post(
                "https://abtalks-nexify-1.onrender.com/resume/upload",
                formData
            );

            setAnalysis(res.data.analysis);

        } catch (err) {
            console.log(err);
            alert("Upload failed");
        } finally {
            setLoading(false);
        }
    };

return (
        <div className="app-bg fade-in">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />

            <div style={{ padding: "20px", position: "relative", zIndex: 2 }}>

                <h1 className="title">AI Resume Analyzer</h1>
                <p className="subtitle">
                    Upload your resume and receive ATS score, keyword suggestions
                    and AI-powered improvements.
                </p>

                <div className="card" style={{ maxWidth: 640, textAlign: "center" }}>
                    <div className="upload-box">
                        <div style={{ fontSize: 50 }}>📄</div>
                        <h3 style={{ margin: "15px 0", color: "#fff" }}>
                            {file ? file.name : "Drag & drop or choose your resume"}
                        </h3>
                        <p style={{ color: "#9ca3af", marginBottom: 20 }}>
                            Supports PDF and DOCX formats
                        </p>
                        <input
                            type="file"
                            accept=".pdf,.docx"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{
                                display: "block",
                                margin: "0 auto 20px",
                                color: "#fff",
                            }}
                        />

                        <button className="btn btn-primary" onClick={uploadResume}>
                            {loading ? "Analyzing..." : "Analyze Resume"}
                        </button>
                    </div>
                </div>

                {analysis && (
                    <div style={{ marginTop: "40px" }}>
                        <ATSDashboard analysis={analysis} />
                    </div>
                )}
            </div>
        </div>
    );
}