import { useMemo } from "react";

export default function Stats({ tech = [] }) {
  const data = useMemo(() => {
    const total = tech.length;

    const counts = tech.reduce((acc, t) => {
      acc[t] = (acc[t] || 0) + 1;
      return acc;
    }, {});

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    return {
      total,
      unique: Object.keys(counts).length,
      top: sorted[0]?.[0] || "None",
      sorted,
    };
  }, [tech]);

  return (
    <div className="stats-shell">

      <div className="stats-header">
        <h2> Study Dashboard</h2>
        <p>Overview of your learning progress</p>
      </div>

      <div className="stats-hero">
        <div className="hero-number">{data.total}</div>
        <div className="hero-label">Total Concepts Extracted</div>
      </div>

      <div className="stats-grid">
        <div className="mini-card">
          <div className="mini-title">Unique Skills</div>
          <div className="mini-value">{data.unique}</div>
        </div>

        <div className="mini-card highlight">
          <div className="mini-title">Top Skill</div>
          <div className="mini-value">{data.top}</div>
        </div>

        <div className="mini-card">
          <div className="mini-title">Depth</div>
          <div className="mini-value">
            {data.total > 10 ? "High" : data.total > 5 ? "Medium" : "Low"}
          </div>
        </div>
      </div>

      <div className="stats-breakdown">
        <h3>Skill Frequency</h3>

        {data.sorted.length === 0 ? (
          <p className="muted">No data yet</p>
        ) : (
          data.sorted.map(([key, value]) => (
            <div key={key} className="bar-row">
              <span>{key}</span>
              <div className="bar">
                <div
                  className="bar-fill"
                  style={{ width: `${Math.min(value * 20, 100)}%` }}
                />
              </div>
              <span className="count">{value}</span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}