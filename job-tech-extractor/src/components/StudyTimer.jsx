import { useState, useEffect, useRef } from "react";
import { styles } from "../styles";

export default function StudyTimer({ isRunning, onToggle, onReset }) {
  const [seconds, setSeconds] = useState(0);
  const interval = useRef(null);

  useEffect(() => {
    if (isRunning) {
      interval.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      clearInterval(interval.current);
    }
    return () => clearInterval(interval.current);
  }, [isRunning]);

  const handleReset = () => {
    setSeconds(0);
    onReset();
  };

  const fmt = s => {
    const h = Math.floor(s / 3600).toString().padStart(2, "0");
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const sc = (s % 60).toString().padStart(2, "0");
    return `${h}:${m}:${sc}`;
  };

  return (
    <div style={styles.timerBox}>
      <span style={styles.timerLabel}>STUDY TIMER</span>
      <span style={styles.timerDisplay}>{fmt(seconds)}</span>
      <div style={styles.timerBtns}>
        <button
          style={{
            ...styles.timerBtn,
            background: isRunning ? "#ff2d2d22" : "#00ff9122",
            color: isRunning ? "#ff2d2d" : "#00ff91",
            borderColor: isRunning ? "#ff2d2d" : "#00ff91",
          }}
          onClick={onToggle}
        >
          {isRunning ? "⏸ PAUSE" : "▶ START"}
        </button>
        <button
          style={{ ...styles.timerBtn, background: "#ffffff08", color: "#555", borderColor: "#333" }}
          onClick={handleReset}
        >
          ↺ RESET
        </button>
      </div>
    </div>
  );
}
