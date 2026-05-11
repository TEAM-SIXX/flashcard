import { useMemo } from "react";
import { styles } from "../styles";

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
    <div style={styles.statsShell}>

      {/* HEADER */}
      <div style={styles.statsHeader}>
        <h2 style={styles.statsHeaderTitle}>
          Study Dashboard
        </h2>

        <p style={styles.statsHeaderSub}>
          Overview of your learning progress
        </p>
      </div>

      {/* HERO */}
      <div style={styles.statsHero}>
        <div style={styles.statsHeroNumber}>
          {data.total}
        </div>

        <div style={styles.statsHeroLabel}>
          Total Concepts Extracted
        </div>
      </div>

      {/* GRID */}
      <div style={styles.statsGrid}>

        <div style={styles.statsMiniCard}>
          <div style={styles.statsMiniTitle}>
            Unique Skills
          </div>

          <div style={styles.statsMiniValue}>
            {data.unique}
          </div>
        </div>

        <div
          style={{
            ...styles.statsMiniCard,
            ...styles.statsMiniCardHighlight,
          }}
        >
          <div style={styles.statsMiniTitle}>
            Top Skill
          </div>

          <div style={styles.statsMiniValue}>
            {data.top}
          </div>
        </div>

        <div style={styles.statsMiniCard}>
          <div style={styles.statsMiniTitle}>
            Depth
          </div>

          <div style={styles.statsMiniValue}>
            {data.total > 10
              ? "High"
              : data.total > 5
              ? "Medium"
              : "Low"}
          </div>
        </div>

      </div>

      {/* BREAKDOWN */}
      <div style={styles.statsBreakdown}>

        <h3 style={styles.statsBreakdownTitle}>
          Skill Frequency
        </h3>

        {data.sorted.length === 0 ? (
          <p style={styles.statsMuted}>
            No data yet
          </p>
        ) : (
          data.sorted.map(([key, value]) => (
            <div
              key={key}
              style={styles.statsBarRow}
            >

              <span style={styles.statsBarLabel}>
                {key}
              </span>

              <div style={styles.statsBar}>
                <div
                  style={{
                    ...styles.statsBarFill,
                    width: `${Math.min(value * 20, 100)}%`,
                  }}
                />
              </div>

              <span style={styles.statsCount}>
                {value}
              </span>

            </div>
          ))
        )}

      </div>

    </div>
  );
}