import { useState, useEffect } from "react";
import { styles } from "../styles";

export default function Flashcard({ card, onNext, onPrev, index, total }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => setFlipped(false), [card]);

  return (
    <div style={styles.cardWrapper}>
      <div style={{ width: "100%", maxWidth: 660 }}>
        <div
          style={{
            height: 1,
            background: "#2a2218",
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${((index + 1) / total) * 100}%`,
              background: "#c9a84c",
              transition: "width 0.4s ease",
              borderRadius: 999,
            }}
          />
        </div>
      </div>

      <div style={styles.cardMeta}>
        <span style={styles.cardTech}>{card.tech}</span>
        <span
          style={{
            ...styles.cardCount,
            fontFamily: "'Courier New', monospace",
          }}
        >
          card {index + 1} of {total}
        </span>
      </div>

      <div style={styles.cardScene} onClick={() => setFlipped((f) => !f)}>
        <div
          style={{
            ...styles.cardInner,
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div style={styles.cardFront}
            <div
              style={{
                position: "absolute",
                top: 18,
                left: 22,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: 4,
                  color: "#4a3e28",
                  fontFamily: "'Courier New', monospace",
                  textTransform: "uppercase",
                }}
              >
                Question
              </span>
            </div>

            <div
              style={{
                position: "absolute",
                top: 14,
                right: 22,
                fontSize: 18,
                color: "#2a2218",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                lineHeight: 1,
              }}
            >
              ✦
            </div>

            <p style={styles.cardQuestion}>{card.q}</p>

            <span style={styles.flipHint}>[ tap to reveal ]</span>
          </div>

          <div style={styles.cardBack}>
            <div
              style={{
                position: "absolute",
                top: 18,
                left: 22,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: 4,
                  color: "#c9a84c",
                  fontFamily: "'Courier New', monospace",
                  textTransform: "uppercase",
                }}
              >
                Answer
              </span>
            </div>

            <div
              style={{
                position: "absolute",
                top: 40,
                left: 22,
                right: 22,
                height: 1,
                background: "linear-gradient(90deg, #5a4a2a 0%, transparent 100%)",
              }}
            />

            <div
              style={{
                position: "absolute",
                top: 14,
                right: 22,
                fontSize: 18,
                color: "#3d3020",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                lineHeight: 1,
              }}
            >
              ✦
            </div>

            <p style={styles.cardAnswer}>{card.a}</p>

            <span
              style={{
                ...styles.flipHint,
                color: "#4a3e28",
              }}
            >
              [ tap to flip back ]
            </span>
          </div>
        </div>
      </div>

      <div style={styles.cardNav}>
        <button
          style={{
            ...styles.navBtn,
            opacity: index === 0 ? 0.3 : 1,
            cursor: index === 0 ? "not-allowed" : "pointer",
          }}
          onClick={onPrev}
          disabled={index === 0}
        >
          ← Prev
        </button>
        <button
          style={{
            ...styles.navBtn,
            ...styles.navBtnNext,
            opacity: index === total - 1 ? 0.3 : 1,
            cursor: index === total - 1 ? "not-allowed" : "pointer",
          }}
          onClick={onNext}
          disabled={index === total - 1}
        >
          Next →
        </button>
      </div>

      <p
        style={{
          fontSize: 9,
          color: "#3d3020",
          letterSpacing: 3,
          fontFamily: "'Courier New', monospace",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        Click card to flip
      </p>
    </div>
  );
}
