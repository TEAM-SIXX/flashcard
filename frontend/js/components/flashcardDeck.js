.deck-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.deck-filter {
  display: flex;
  gap: 6px;
  background: white;
  padding: 4px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.filter-btn {
  background: none;
  border: none;
  font-family: var(--font);
  font-size: 12px;
  font-weight: 600;
  padding: 7px 14px;
  border-radius: 9px;
  cursor: pointer;
  color: var(--muted);
  transition: all 0.2s;
  text-transform: capitalize;
}

.filter-btn.active {
  background: linear-gradient(135deg, var(--purple), var(--pink));
  color: white;
}

.flashcard-scene {
  perspective: 1200px;
  margin-bottom: 16px;
}

.flashcard {
  position: relative;
  width: 100%;
  min-height: 260px;
  transform-style: preserve-3d;
  transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.flashcard.flipped {
  transform: rotateY(180deg);
}

.card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: var(--radius);
  padding: 32px;
  display: flex;
  flex-direction: column;
  border: 1.5px solid var(--border);
}

.card-front {
  background: white;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
}

.card-back {
  transform: rotateY(180deg);
  background: linear-gradient(135deg, #7c3aed 0%, #f43f8e 100%);
  border-color: transparent;
  color: white;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.card-tag {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 6px;
  background: var(--bg);
  color: var(--purple);
}

.card-back .card-tag {
  background: rgba(255,255,255,0.2);
  color: white;
}

.card-difficulty {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 4px 10px;
  border-radius: 6px;
}

.card-difficulty.beginner     { background: #d1fae5; color: #059669; }
.card-difficulty.intermediate { background: #fef3c7; color: #d97706; }
.card-difficulty.advanced     { background: #fce7f3; color: #db2777; }

.card-back .card-difficulty {
  background: rgba(255,255,255,0.2);
  color: white;
}

.card-question {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.5;
  flex: 1;
  display: flex;
  align-items: center;
}

.card-answer {
  font-size: 14px;
  line-height: 1.8;
  flex: 1;
  display: flex;
  align-items: center;
  color: rgba(255,255,255,0.92);
}

.card-hint {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  margin-top: 16px;
}

.card-back .card-hint {
  color: rgba(255,255,255,0.5);
}

.bookmark-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  opacity: 0.3;
  transition: opacity 0.15s, transform 0.15s;
  padding: 0;
  line-height: 1;
}

.bookmark-btn:hover { opacity: 0.7; transform: scale(1.2); }
.bookmark-btn.active { opacity: 1; }

.card-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
}

.nav-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1.5px solid var(--border);
  background: white;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.nav-btn:hover:not(:disabled) {
  background: var(--purple);
  border-color: var(--purple);
  color: white;
  transform: scale(1.05);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.card-counter {
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
  min-width: 60px;
  text-align: center;
}

.rating-row {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 14px;
}

.rate-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1.5px solid var(--border);
  background: white;
  font-family: var(--font);
  font-size: 14px;
  font-weight: 700;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s;
}

.rate-btn:hover {
  border-color: var(--purple);
  color: var(--purple);
  transform: translateY(-2px);
}

.rate-btn.selected {
  background: linear-gradient(135deg, var(--purple), var(--pink));
  border-color: transparent;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(124,58,237,0.3);
}
