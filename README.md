# Job Description Flashcards

A React application that turns job descriptions into study flashcards.

Users can paste a job description, extract technologies, and generate AI-powered flashcards for interview preparation and learning.

## Features

* AI-generated flashcards
* Flashcard study mode
* Spaced repetition scoring
* Bookmarking cards
* Export decks as JSON
* Loading indicators during generation

## Tech Stack

* React
* Vite
* OpenRouter API

## Setup

Clone the repository:

```bash id="dbw2lf"
git clone https://github.com/MarkWainainaWagacha/flashcard.git
```

Move into the frontend folder:

```bash id="apet7s"
cd frontend
```

Install dependencies:

```bash id="g7wwzs"
npm install
```

Create a `.env` file in the frontend directory:

```env id="t8e8p7"
VITE_OPENROUTER_KEY=your_api_key
```

Start the development server:

```bash id="jlwmfq"
npm run dev
```

Open the local Vite URL shown in the terminal.
