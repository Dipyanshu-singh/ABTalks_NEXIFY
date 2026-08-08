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

        <div style={{ padding: 40 }}>

            <h1>Job Matcher</h1>

            <textarea
                rows={10}
                placeholder="Paste Resume Text"
                value={resume}
                onChange={(e)=>setResume(e.target.value)}
            />

            <br /><br />

            <textarea
                rows={10}
                placeholder="Paste Job Description"
                value={jd}
                onChange={(e)=>setJd(e.target.value)}
            />

            <br /><br />

            <button onClick={analyze}>

                {loading ? "Analyzing..." : "Analyze"}

            </button>

            {result && (

                <div style={{ marginTop:40 }}>

                    <h2>Match Score</h2>

                    <h1>{result.match_score}%</h1>

                    <h2>Matching Skills</h2>

                    <ul>

                        {result.matching_skills.map((s,i)=>

                            <li key={i}>{s}</li>

                        )}

                    </ul>

                    <h2>Missing Skills</h2>

                    <ul>

                        {result.missing_skills.map((s,i)=>

                            <li key={i}>{s}</li>

                        )}

                    </ul>

                    <h2>Suggestions</h2>

                    <ul>

                        {result.suggestions.map((s,i)=>

                            <li key={i}>{s}</li>

                        )}

                    </ul>

                </div>

            )}

        </div>

    );

}