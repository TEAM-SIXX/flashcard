import { useState } from "react";
import FlashcardDeck from "./components/FlashcardDeck.jsx";
import JDInput from "./components/jdInput.jsx";
import Stats from "./components/studyStats.jsx";
import { generateAICards } from "./api/api";

export default function App() {
  const [deck, setDeck] = useState([]);
  const [tech, setTech] = useState([]);
  const [view, setView] = useState("input");
  const [loading, setLoading] = useState(false);
  const [usedFallback, setUsedFallback] = useState(false);

  // -----------------------------
  // MAIN PIPELINE
  // -----------------------------
  const handleResult = async (data) => {
    const techList = data.tech || [];

    setTech(techList);
    setLoading(true);
    setUsedFallback(false);

    try {
      let fallbackUsed = false;

      const allCards = await Promise.all(
        techList.map(async (t) => {
          const result = await generateAICards(t);

          if (result.fallback) {
            fallbackUsed = true;
          }

          const cards = result.cards || [];

          return cards.map((c, i) => ({
            id: `${t}_${Date.now()}_${i}`,
            tech: t,
            front: c.front,
            back: c.back,
            difficulty: c.difficulty || "Beginner",
          }));
        })
      );

      setUsedFallback(fallbackUsed);

      const flatDeck = allCards.flat();

      setDeck(flatDeck);
      setView("study");

    } catch (err) {
      console.error("Deck generation failed:", err);
      setDeck([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Sidebar view={view} setView={setView} />

      <main className="main-view">

        {/* LOADING STATE */}
        {loading && (
          <div className="loading-screen">
            <h2>Generating AI Flashcards...</h2>
            <p>This can take a few seconds.</p>
          </div>
        )}

        {/* INPUT */}
        {!loading && view === "input" && (
          <JDInput onResult={handleResult} />
        )}

        {/* STUDY */}
        {!loading && view === "study" && (
          <FlashcardDeck
            deck={deck}
            usedFallback={usedFallback}
          />
        )}

        {/* STATS */}
        {!loading && view === "stats" && (
          <Stats tech={tech} />
        )}

      </main>
    </div>
  );
}

// -----------------------------
// SIDEBAR
// -----------------------------
function Sidebar({ view, setView }) {
  return (
    <div className="sidebar">
      <h2>Job Flashcards</h2>

      <button onClick={() => setView("input")}>
        Generate
      </button>

      <button onClick={() => setView("study")}>
        Study
      </button>

      <button onClick={() => setView("stats")}>
        Stats
      </button>
    </div>
  );
}