# Job Tech Extractor & SRS Flashcard Generator

### **Project Description**
A specialized interview preparation engine built with **React** and **Vite**. This application allows job seekers to paste a job description, which is then processed by the **Groq AI (Llama3)** to extract the required tech stack. The app automatically generates custom flashcards and merges them with a master database of technical questions, using a **Spaced Repetition System (SRS)** logic layer to track learning progress.

### **Setup Instructions**
To run this project locally, follow these steps:
1. **Clone the repository:** `git clone https://github.com/MarkWainainaWagacha/flashcard.git`
2. **Navigate to the project folder:** `cd job-tech-extractor`
3. **Install dependencies:** `npm install`
4. **Launch the development server:** `npm run dev`
5. **Open in browser:** `http://localhost:5173`

### **API Used**
* **External API:** Groq Cloud API
* **Model:** Llama-3-70b
* **Endpoints:** `/chat/completions` (Used for semantic tech stack extraction and flashcard generation).

### **Key Features**
* **Dynamic Extraction:** Real-time processing of unstructured job postings.
* **SRS Math:** Logic-based study session tracking for optimized retention.
* **React Routing:** Tab-based navigation between Extraction, Database browsing, and Study modes.
* **Modern UI:** High-contrast "hacker" aesthetic for focused study sessions.

### **Challenges & Known Bugs**
* **Git Conflicts:** Resolved significant "unrelated histories" issues during the migration from a legacy backend to a Vite-based frontend.
* **Environment Configuration:** Addressed versioning conflicts by standardizing on Node v24.
* **API Latency:** Implemented loading states to handle asynchronous data fetching from the Llama3 model gracefully.
