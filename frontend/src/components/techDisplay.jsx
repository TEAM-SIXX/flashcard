import { useEffect, useState } from "react";
import {
  updateSRS,
  getLocalStorageData,
  setLocalStorageData,
  filterDueCards,
} from "../utils/helpers";

export default function FlashcardDeck({ deck = [] }) {
  const [filteredDeck, setFilteredDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // initialize deck
  useEffect(() => {
    const due = filterDueCards(deck);
    setFilteredDeck(due);

    if (due.length === 0) {
      alert(
        "Great job! No cards are due for review right now. Come back later or generate new ones."
      );
    }
  }, [deck]);

  const currentCard = filteredDeck[currentIndex];

  const next = () => {
    setIsFlipped(false);
    setCurrentIndex((i) => (i + 1) % filteredDeck.length);
  };

  const prev = () => {
    setIsFlipped(false);
    setCurrentIndex((i) =>
      i - 1 < 0 ? filteredDeck.length - 1 : i - 1
    );
  };

  const rateCard = (rating) => {
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

    next();
  };

  const toggleBookmark = () => {
    const bookmarks = getLocalStorageData("bookmarks");
    bookmarks[currentCard.id] = !bookmarks[currentCard.id];
    setLocalStorageData("bookmarks", bookmarks);
  };

  if (!currentCard) return <p>No cards available</p>;

  const bookmarks = getLocalStorageData("bookmarks");

  return (
    <div className="flashcard-container">
      {/* Card Info */}
      <div className="card-stats">
        <span>
          Card {currentIndex + 1} of {filteredDeck.length}
        </span>
        <span>{currentCard.tech}</span>
        <span>{currentCard.difficulty}</span>
      </div>

      {/* Flashcard */}
      <div
        className={`flip-card ${isFlipped ? "flipped" : ""}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <p>{currentCard.front}</p>
          </div>

          <div className="flip-card-back">
            <p>{currentCard.back}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <button onClick={toggleBookmark}>
          {bookmarks?.[currentCard.id] ? "★" : "☆"}
        </button>

        <div>
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => rateCard(n)}>
              {n}
            </button>
          ))}
        </div>

        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}