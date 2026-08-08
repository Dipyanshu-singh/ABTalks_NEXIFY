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
                "http://127.0.0.1:8000/resume/upload",
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
        <div style={{ padding: "40px" }}>

            <h1>AI Resume Analyzer</h1>

            <input
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <br /><br />

            <button onClick={uploadResume}>
                {loading ? "Analyzing..." : "Analyze Resume"}
            </button>

            {analysis && (
                <div style={{ marginTop: "40px" }}>
                    <ATSDashboard analysis={analysis} />
                </div>
            )}

        </div>
    );
}