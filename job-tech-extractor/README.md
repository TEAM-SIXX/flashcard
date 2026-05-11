# Job Tech Extractor v2.0

**Interview Prep Engine — Black Psyops Edition**

Paste any job description → Claude extracts every technology → instant flashcard deck with 3D flip and paginated study mode. Comes with a 60-card master Q&A database you can scale to 50k.

---

## Features

- ⚡ **AI Extraction** — Claude Sonnet reads job postings and generates targeted interview Q&As
- ◈ **Master Database** — 60 production-grade Q&As across 18 technologies (extend to 50k in `src/data/database.js`)
- **Flashcard Flip** — Click any card to 3D-flip to the answer
- **← PREV / NEXT →** — Navigate cards one at a time
- **Study Timer** — Track session time in the header
- **Browse & Filter** — Filter the master DB by technology, then study any filtered subset
- **URL Scraper** — Paste a job URL, scrape via allorigins.win CORS proxy, auto-extract
- **Psyops UI** — Monochrome terminal aesthetic, scanline overlay, phosphor green accents

---

## Setup

### Prerequisites
- Node.js 18+
- A Claude API key (get one at https://console.anthropic.com)

### Install & Run

```bash
npm install
npm run dev
```

Open http://localhost:5173

### API Key

The app calls the Anthropic API from the browser. For production deployment, proxy the API call through your own backend to keep your key secret.

For local dev, you can temporarily hardcode your key in `src/App.jsx` in the fetch headers:

```js
headers: {
  "Content-Type": "application/json",
  "x-api-key": "YOUR_KEY_HERE",        // add this line
  "anthropic-version": "2023-06-01",   // add this line
}
```

---

## Extending the Database

Open `src/data/database.js` and append to the `MASTER_QA_DB` array:

```js
{ id: 61, tech: "Kafka", q: "What is consumer group rebalancing?", a: "When a consumer joins or leaves a group, Kafka reassigns partition ownership across all consumers in the group. During rebalancing, consumption pauses. Minimize impact with static membership (group.instance.id) and incremental cooperative rebalancing (the default since Kafka 2.4)." },
```

---

## Free Scraping APIs

| Service | Notes |
|---|---|
| `api.allorigins.win` | CORS proxy, no key, used by default |
| `r.jina.ai/` | Prefix any URL, free, returns clean markdown |
| cors-anywhere | Self-host on Railway/Heroku |
| Diffbot | 10k free API calls, structured extraction |
| ScrapingBee | 1000 free credits, JS rendering |
| Browserless | Headless Chrome API, generous free tier |

---

## Project Structure

```
job-tech-extractor/
├── index.html
├── vite.config.js
├── package.json
├── README.md
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Main app, tab routing, API calls
    ├── styles.js             # All inline styles (single source of truth)
    ├── data/
    │   └── database.js       # Master Q&A database — extend this file
    └── components/
        ├── Flashcard.jsx     # 3D flip card with prev/next nav
        └── StudyTimer.jsx    # HH:MM:SS study session timer
```
