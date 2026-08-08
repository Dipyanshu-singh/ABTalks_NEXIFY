import { useState } from "react";
import axios from "axios";

export default function JobMatcher() {

    const [resume, setResume] = useState("");
    const [jd, setJd] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    async function analyze() {

        try {

            setLoading(true);

            const res = await axios.post(
                "http://127.0.0.1:8000/job/match",
                {
                    resume_text: resume,
                    job_description: jd,
                }
            );

            setResult(res.data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    }

return (

        <div className="app-bg fade-in">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />

            <div style={{ padding: 20, position: "relative", zIndex: 2 }}>

                <h1 className="title">Job Matcher</h1>
                <p className="subtitle">
                    Match your resume against a job description to find gaps and
                    improve your application.
                </p>

                <div className="grid grid-2">
                    <div className="card">
                        <h3 style={{ color: "#fff", marginBottom: 15 }}>📄 Resume Text</h3>
                        <textarea
                            rows={10}
                            placeholder="Paste Resume Text"
                            value={resume}
                            onChange={(e) => setResume(e.target.value)}
                            className="input"
                            style={{ resize: "vertical" }}
                        />
                    </div>

                    <div className="card">
                        <h3 style={{ color: "#fff", marginBottom: 15 }}>💼 Job Description</h3>
                        <textarea
                            rows={10}
                            placeholder="Paste Job Description"
                            value={jd}
                            onChange={(e) => setJd(e.target.value)}
                            className="input"
                            style={{ resize: "vertical" }}
                        />
                    </div>
                </div>

                <div style={{ textAlign: "center", marginTop: 20 }}>
                    <button className="btn btn-primary" onClick={analyze}>
                        {loading ? "Analyzing..." : "Analyze Match"}
                    </button>
                </div>

                {result && (

                    <div className="grid grid-2" style={{ marginTop: 40 }}>

                        <div className="score-card" style={{ textAlign: "center" }}>
                            <h2>Match Score</h2>
                            <div style={{ fontSize: 70, background: "linear-gradient(90deg,#a78bfa,#22d3ee)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 800 }}>
                                {result.match_score}%
                            </div>
                        </div>

                        <div className="card">
                            <h3 style={{ color: "#fff", marginBottom: 15 }}>✅ Matching Skills</h3>
                            <div className="chips">
                                {result.matching_skills.map((s, i) =>
                                    <span key={i} className="chip">{s}</span>
                                )}
                            </div>
                        </div>

                        <div className="card">
                            <h3 style={{ color: "#fff", marginBottom: 15 }}>❌ Missing Skills</h3>
                            <ul style={{ paddingLeft: 20 }}>
                                {result.missing_skills.map((s, i) =>
                                    <li key={i} style={{ color: "#f87171", margin: "8px 0" }}>{s}</li>
                                )}
                            </ul>
                        </div>

                        <div className="card">
                            <h3 style={{ color: "#fff", marginBottom: 15 }}>💡 Suggestions</h3>
                            <ul style={{ paddingLeft: 20 }}>
                                {result.suggestions.map((s, i) =>
                                    <li key={i} style={{ color: "#34d399", margin: "8px 0" }}>{s}</li>
                                )}
                            </ul>
                        </div>

                    </div>

                )}
            </div>
        </div>

    );

}