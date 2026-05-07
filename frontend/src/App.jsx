import { useState } from "react";
import FlashcardDeck from "./components/FlashcardDeck.jsx";
import JDInput from "./components/jdInput.jsx";
import Stats from "./components/studyStats.jsx";
import { generateDeck } from "./api/api";

export default function App() {
  const [deck, setDeck] = useState([]);
  const [tech, setTech] = useState([]);
  const [view, setView] = useState("input");

  const handleResult = (data) => {
    const techList = data.tech || [];

    setTech(techList);

    // 🔥 USE YOUR LOCAL DB GENERATOR
    const res = generateDeck(techList);

    const generatedDeck = res.cards.map((q) => ({
      id: q.id,
      tech: q.tech,
      difficulty: q.difficulty || "Beginner",
      front: q.question,
      back: q.answer,
    }));

    setDeck(generatedDeck);

    // auto switch to study
    setView("study");
  };

  return (
    <div className="app-container">
      <Sidebar view={view} setView={setView} />

      <main className="main-view">
        {view === "input" && <JDInput onResult={handleResult} />}

        {view === "study" && <FlashcardDeck deck={deck} />}

        {view === "stats" && <Stats tech={tech} />}
      </main>
    </div>
  );
}

/* ---------------------------
   SIDEBAR
--------------------------- */
function Sidebar({ view, setView }) {
  return (
    <div className="sidebar">
      <h2> Job Description Flashcards</h2>

      <button
        className={view === "input" ? "active" : ""}
        onClick={() => setView("input")}
      >
        Generate cards
      </button>

      <button
        className={view === "study" ? "active" : ""}
        onClick={() => setView("study")}
      >
        Study
      </button>

      <button
        className={view === "stats" ? "active" : ""}
        onClick={() => setView("stats")}
      >
        Stats
      </button>
    </div>
  );
}