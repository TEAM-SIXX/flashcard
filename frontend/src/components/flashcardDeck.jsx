import { useEffect, useState } from "react";
import {
  updateSRS,
  getLocalStorageData,
  setLocalStorageData,
} from "../utils/helpers";

export default function FlashcardDeck({ deck = [] }) {
  // -----------------------------
  // STATE
  // -----------------------------
  const [masterDeck, setMasterDeck] = useState([]);
  const [filteredDeck, setFilteredDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = filteredDeck[currentIndex];

  // -----------------------------
  // INIT DECK (FIXED)
  // -----------------------------
  useEffect(() => {
    if (!Array.isArray(deck)) return;

    if (deck.length === 0) {
      setMasterDeck([]);
      setFilteredDeck([]);
      setCurrentIndex(0);
      setIsFlipped(false);
      return;
    }

    setMasterDeck(deck);
    setFilteredDeck(deck);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [deck]);

  // -----------------------------
  // KEEP INDEX SAFE
  // -----------------------------
  useEffect(() => {
    if (currentIndex >= filteredDeck.length) {
      setCurrentIndex(0);
    }
  }, [filteredDeck, currentIndex]);

  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  // -----------------------------
  // NAVIGATION
  // -----------------------------
  const nextCard = () => {
    if (!filteredDeck.length) return;
    setCurrentIndex((i) => (i + 1) % filteredDeck.length);
  };

  const prevCard = () => {
    if (!filteredDeck.length) return;
    setCurrentIndex((i) =>
      i - 1 < 0 ? filteredDeck.length - 1 : i - 1
    );
  };

  // -----------------------------
  // SRS
  // -----------------------------
  const rateCard = (rating) => {
    if (!currentCard) return;

    const srsData = getLocalStorageData("srs_data");

    const defaultSRS = {
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      nextReview: Date.now(),
    };

    const current = srsData[currentCard.id] || defaultSRS;

    srsData[currentCard.id] = updateSRS(current, rating);
    setLocalStorageData("srs_data", srsData);

    nextCard();
  };

  // -----------------------------
  // BOOKMARK
  // -----------------------------
  const toggleBookmark = () => {
    if (!currentCard) return;

    const bookmarks = getLocalStorageData("bookmarks");
    bookmarks[currentCard.id] = !bookmarks[currentCard.id];

    setLocalStorageData("bookmarks", bookmarks);
  };

  // -----------------------------
  // FILTER (FIXED SAFE VERSION)
  // -----------------------------
  const applyFilters = (search = "", diff = "all") => {
    const base = masterDeck.length ? masterDeck : deck;

    const filtered = base.filter((c) => {
      const text = search.toLowerCase();

      const matchText =
        c.front.toLowerCase().includes(text) ||
        c.tech.toLowerCase().includes(text);

      const matchDiff = diff === "all" || c.difficulty === diff;

      return matchText && matchDiff;
    });

    setFilteredDeck(filtered);
    setCurrentIndex(0);
  };

  // -----------------------------
  // EXPORT
  // -----------------------------
  const exportDeck = () => {
    const blob = new Blob(
      [JSON.stringify(masterDeck, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "study_deck.json";
    a.click();
  };

  // -----------------------------
  // LOADING GUARD (FIXED)
  // -----------------------------
  if (!filteredDeck.length) {
    return (
      <div className="empty-state">
        <h2>No cards yet</h2>
        <p>Generate a deck from a job description first.</p>
      </div>
    );
  }

  const bookmarks = getLocalStorageData("bookmarks");

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="flashcard-deck">

      <div className="card-stats">
        <span>
          Card {currentIndex + 1} of {filteredDeck.length}
        </span>

        <span className="badge">{currentCard.tech}</span>
        <span className="badge">{currentCard.difficulty}</span>
      </div>

      {/* STACK */}
      <div className="deck-stage">
        <div className="card-stack level-2" />
        <div className="card-stack level-1" />

        <div
          className={`flip-card ${isFlipped ? "flipped" : ""}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="flip-inner">
            <div className="front">{currentCard.front}</div>
            <div className="back">{currentCard.back}</div>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="actions">
        <button onClick={toggleBookmark}>
          {bookmarks[currentCard.id] ? "★" : "☆"}
        </button>

        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} onClick={() => rateCard(n)}>
            {n}
          </button>
        ))}
      </div>

      {/* NAV */}
      <div className="nav">
        <button onClick={prevCard}>← Prev</button>
        <button onClick={nextCard}>Next →</button>
      </div>

      <button className="export-btn" onClick={exportDeck}>
        Export Deck
      </button>
    </div>
  );
}