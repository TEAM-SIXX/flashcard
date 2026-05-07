/**
 * FRONTEND DATA ARCHITECTURE
 * -----------------------------------------
 * This file serves as our local database for the flashcards.
 * Each entry is mapped to a 'tech' key that our scanner recognizes.
 */

export const MASTER_QUESTIONS = [
    // --- FRONTEND TRACK ---
    {
        id: "js_base_01",
        tech: "JavaScript",
        question: "Explain 'Closures' in simple terms.",
        answer: "A closure is when a function remembers and can access variables from its outer scope even after that outer function has finished executing."
    },
    {
        id: "react_base_01",
        tech: "React",
        question: "What is the difference between State and Props?",
        answer: "State is managed within the component (private), while Props are passed to the component from a parent (external)."
    },
    
    // --- BACKEND TRACK ---
    {
        id: "py_base_01",
        tech: "Python",
        question: "What does the 'self' keyword do in Python classes?",
        answer: "It represents the instance of the object itself, allowing you to access the attributes and methods of that specific class instance."
    },
    {
        id: "flask_base_01",
        tech: "Flask",
        question: "What is the purpose of a Virtual Environment (venv)?",
        answer: "It creates an isolated space for a project’s dependencies so that different projects don't interfere with each other's library versions."
    },

    // --- VERSION CONTROL ---
    {
        id: "git_base_01",
        tech: "Git",
        question: "What is the 'Staging Area' in Git?",
        answer: "It is a middle-ground where you 'add' changes to prepare them before you officially 'commit' them to the history."
    }
];