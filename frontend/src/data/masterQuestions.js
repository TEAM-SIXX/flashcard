/**
 * FRONTEND DATA ARCHITECTURE
 * -----------------------------------------
 * This file serves as our local database for the flashcards.
 * Each entry is mapped to a 'tech' key that our scanner recognizes.
 */

export const MASTER_QUESTIONS = [
  // =========================
  // JAVASCRIPT (CORE)
  // =========================
  {
    id: "js_01",
    tech: "JavaScript",
    question: "What is a closure?",
    answer:
      "A closure is a function that remembers variables from its outer scope even after that scope has finished executing.",
  },
  {
    id: "js_02",
    tech: "JavaScript",
    question: "What is the difference between let, const, and var?",
    answer:
      "var is function-scoped, while let and const are block-scoped. const cannot be reassigned.",
  },
  {
    id: "js_03",
    tech: "JavaScript",
    question: "What is event delegation?",
    answer:
      "A technique where a parent element handles events for its child elements using event bubbling.",
  },

  // =========================
  // REACT
  // =========================
  {
    id: "react_01",
    tech: "React",
    question: "What is state in React?",
    answer:
      "State is internal data managed within a component that can change over time and trigger re-renders.",
  },
  {
    id: "react_02",
    tech: "React",
    question: "What are hooks?",
    answer:
      "Hooks are functions like useState and useEffect that let you use React features in functional components.",
  },
  {
    id: "react_03",
    tech: "React",
    question: "What causes a React component to re-render?",
    answer:
      "Changes in state or props cause a component to re-render.",
  },

  // =========================
  // NODE.JS
  // =========================
  {
    id: "node_01",
    tech: "Node",
    question: "What is Node.js?",
    answer:
      "A JavaScript runtime built on Chrome's V8 engine that allows JS to run on the server.",
  },
  {
    id: "node_02",
    tech: "Node",
    question: "What is the event loop?",
    answer:
      "A mechanism that handles asynchronous operations in Node.js by offloading tasks and executing callbacks.",
  },
  {
    id: "node_03",
    tech: "Node",
    question: "What is npm?",
    answer:
      "Node Package Manager, used to install and manage JavaScript dependencies.",
  },

  // =========================
  // PYTHON
  // =========================
  {
    id: "py_01",
    tech: "Python",
    question: "What is a dictionary in Python?",
    answer:
      "A collection of key-value pairs used to store and retrieve data efficiently.",
  },
  {
    id: "py_02",
    tech: "Python",
    question: "What does 'self' mean?",
    answer:
      "It refers to the instance of a class, allowing access to its attributes and methods.",
  },
  {
    id: "py_03",
    tech: "Python",
    question: "What is list comprehension?",
    answer:
      "A concise way to create lists using a single line of code.",
  },

  // =========================
  // API / BACKEND GENERAL
  // =========================
  {
    id: "api_01",
    tech: "API",
    question: "What is REST?",
    answer:
      "An architectural style for APIs using HTTP methods like GET, POST, PUT, DELETE.",
  },
  {
    id: "api_02",
    tech: "API",
    question: "What is JSON?",
    answer:
      "A lightweight data format used to send structured data between systems.",
  },

  // =========================
  // GIT
  // =========================
  {
    id: "git_01",
    tech: "Git",
    question: "What is a commit?",
    answer:
      "A snapshot of changes in your project history.",
  },
  {
    id: "git_02",
    tech: "Git",
    question: "What is a branch?",
    answer:
      "A parallel version of your code used for features or fixes.",
  },
];