import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ATSDashboard({ analysis }) {
  return (
    <div className="ats-container">

      <div className="score-card">
        <h2>ATS Score</h2>

        <div style={{ width: 180, height: 180 }}>
          <CircularProgressbar
            value={analysis.ats_score}
            text={`${analysis.ats_score}%`}
          />
        </div>
      </div>

      <div className="summary-card">
        <h2>Summary</h2>
        <p>{analysis.summary}</p>
      </div>

      <div className="card">
        <h2>Skills</h2>
        <div className="chips">
          {analysis.skills.map((skill, i) => (
            <span key={i} className="chip">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>Strengths</h2>
        <ul>
          {analysis.strengths.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Weaknesses</h2>
        <ul>
          {analysis.weaknesses.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2>Suggestions</h2>
        <ul>
          {analysis.suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}