import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";

import JDInput from "./components/jdInput";
import TechDisplay from "./components/techDisplay";
import FlashcardDeck from "./components/flashcardDeck";
import StudyStats from "./components/studyStats";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<JDInput />} />
      <Route path="/tech" element={<TechDisplay />} />
      <Route path="/study" element={<FlashcardDeck />} />
      <Route path="/dashboard" element={<StudyStats />} />
    </Routes>
  </BrowserRouter>
);