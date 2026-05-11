import { useState, useEffect } from "react";
import { styles } from "../styles";

export default function Flashcard({ card, onNext, onPrev, index, total }) {
  const [flipped, setFlipped] = useState(false);

  // Reset flip state when card changes
  useEffect(() => setFlipped(false), [card]);

  return (
    <div style={styles.cardWrapper}>
      <div style={styles.cardMeta}>
        <span style={styles.cardTech}>{card.tech}</span>
        <span style={styles.cardCount}>{index + 1} / {total}</span>
      </div>

      {/* 3D flip scene */}
      <div style={styles.cardScene} onClick={() => setFlipped(f => !f)}>
        <div
          style={{
            ...styles.cardInner,
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front — Question */}
          <div style={styles.cardFront}>
            <div style={styles.cardCorner}>Q</div>
            <p style={styles.cardQuestion}>{card.q}</p>
            <span style={styles.flipHint}>[ tap to reveal answer ]</span>
          </div>

          {/* Back — Answer */}
          <div style={styles.cardBack}>
            <div style={{ ...styles.cardCorner, color: "#00ff91" }}>A</div>
            <p style={styles.cardAnswer}>{card.a}</p>
            <span style={{ ...styles.flipHint, color: "#1a3d2a" }}>[ tap to flip back ]</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={styles.cardNav}>
        <button
          style={styles.navBtn}
          onClick={onPrev}
          disabled={index === 0}
        >
          ← PREV
        </button>
        <button
          style={{ ...styles.navBtn, ...styles.navBtnNext }}
          onClick={onNext}
          disabled={index === total - 1}
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}
