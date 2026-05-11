import { useState, useCallback } from "react";
import { MASTER_QA_DB, ALL_TECHS } from "./data/database";
import StudyTimer from "./components/StudyTimer";
import Flashcard from "./components/Flashcard";
import { styles } from "./styles";

const GROQ_API_KEY = "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";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama3-8b-8192";

const TECH_KEYWORDS = {
  "React": ["react", "react.js", "reactjs", "jsx", "redux", "react hooks"],
  "Node.js": ["node", "node.js", "nodejs", "npm", "express", "fastify"],
  "TypeScript": ["typescript", "tsx", "type safety", "strongly typed"],
  "Python": ["python", "django", "flask", "fastapi", "pandas", "numpy"],
  "PostgreSQL": ["postgres", "postgresql", "psql"],
  "MongoDB": ["mongodb", "mongo", "mongoose", "atlas"],
  "AWS": ["aws", "amazon web services", "ec2", "s3", "lambda", "sqs", "rds", "cloudfront"],
  "Docker": ["docker", "dockerfile", "container", "containerize"],
  "Kubernetes": ["kubernetes", "k8s", "kubectl", "helm"],
  "Redis": ["redis", "cache", "caching", "pub/sub"],
  "GraphQL": ["graphql", "apollo", "gql"],
  "SQL": ["sql", "mysql", "relational database", "joins", "orm"],
  "Next.js": ["next.js", "nextjs", "ssr", "ssg", "server side rendering"],
  "REST API": ["rest", "restful", "api", "http", "endpoint", "openapi", "swagger"],
  "Security": ["jwt", "oauth", "authentication", "authorization", "csrf", "xss"],
  "CI/CD": ["ci/cd", "cicd", "github actions", "jenkins", "pipeline", "devops"],
  "System Design": ["system design", "scalability", "distributed", "microservices", "architecture"],
  "Algorithms": ["data structures", "algorithms", "complexity", "big o"],
  "Express": ["express", "expressjs", "middleware"],
};

function extractTechsLocal(text) {
  const lower = text.toLowerCase();
  return Object.entries(TECH_KEYWORDS)
    .filter(([, keywords]) => keywords.some(kw => lower.includes(kw)))
    .map(([tech]) => tech);
}

export default function App() {
  const [tab, setTab] = useState("extract");
  const [inputText, setInputText] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [deck, setDeck] = useState([]);
  const [deckIndex, setDeckIndex] = useState(0);
  const [filterTech, setFilterTech] = useState("All");
  const [timerRunning, setTimerRunning] = useState(false);
  const [foundTechs, setFoundTechs] = useState([]);

  const browseDeck = filterTech === "All" ? MASTER_QA_DB : MASTER_QA_DB.filter(q => q.tech === filterTech);

  const buildDeck = useCallback((techs, aiCards = []) => {
    const masterMatches = MASTER_QA_DB.filter(q => techs.includes(q.tech));
    const combined = [...aiCards, ...masterMatches];
    return combined.length > 0 ? combined : MASTER_QA_DB;
  }, []);

  const extractFromText = useCallback(async (text) => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setStatus("Calling Groq AI...");

    try {
      const resp = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [{
            role: "user",
            content: `You are a technical interview prep assistant. Analyze this job description and identify all technologies, frameworks, tools, and platforms mentioned.

For each technology found, create one flashcard as a JSON object with:
- "tech": technology name
- "q": a specific production-focused interview question  
- "a": a concise expert answer with trade-offs and real patterns

Return ONLY a valid JSON array. No markdown, no fences, no explanation.

Job description:
${text.slice(0, 3000)}`
          }],
          temperature: 0.3,
          max_tokens: 2000,
        })
      });

      if (!resp.ok) throw new Error(`Groq error: ${resp.status}`);

      const data = await resp.json();
      const raw = data.choices?.[0]?.message?.content || "[]";
      const clean = raw.replace(/```json|```/g, "").trim();

      let aiCards = [];
      try {
        aiCards = JSON.parse(clean).map((c, i) => ({ id: `ai-${i}`, ...c }));
      } catch {
        aiCards = [];
      }

      const localTechs = extractTechsLocal(text);
      const allTechs = [...new Set([...aiCards.map(c => c.tech), ...localTechs])];
      setFoundTechs(allTechs);
      const cards = buildDeck(localTechs, aiCards);
      setDeck(cards);
      setDeckIndex(0);
      setTab("study");
    } catch (e) {
      // Fallback to local extraction if Groq fails
      setStatus("AI unavailable, using local extraction...");
      const techs = extractTechsLocal(text);
      setFoundTechs(techs);
      const cards = buildDeck(techs);
      setDeck(cards);
      setDeckIndex(0);
      setTab("study");
      if (e.message.includes("401")) {
        setError("Invalid API key. Check your Groq key at console.groq.com");
      }
    } finally {
      setLoading(false);
      setStatus("");
    }
  }, [buildDeck]);

  const extractFromUrl = useCallback(async () => {
    if (!inputUrl) return;
    setLoading(true);
    setError("");
    setStatus("Fetching page...");
    try {
      const resp = await fetch(`https://r.jina.ai/${inputUrl}`);
      const text = await resp.text();
      if (!text.trim()) throw new Error("empty");
      await extractFromText(text);
    } catch {
      try {
        setStatus("Trying fallback proxy...");
        const resp = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(inputUrl)}`);
        const data = await resp.json();
        const doc = new DOMParser().parseFromString(data.contents, "text/html");
        const text = doc.body?.innerText || "";
        if (!text.trim()) throw new Error("empty");
        await extractFromText(text);
      } catch {
        setError("Could not fetch URL. Paste the job description text directly instead.");
        setLoading(false);
        setStatus("");
      }
    }
  }, [inputUrl, extractFromText]);

  return (
    <div style={styles.root}>
      <div style={styles.scanlines} />
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.logo}>◈</span>
          <div>
            <div style={styles.logoText}>JOB TECH EXTRACTOR</div>
            <div style={styles.logoSub}>INTERVIEW PREP ENGINE // v3.0 // POWERED BY GROQ</div>
          </div>
        </div>
        <StudyTimer isRunning={timerRunning} onToggle={() => setTimerRunning(r => !r)} onReset={() => setTimerRunning(false)} />
      </header>

      <nav style={styles.tabNav}>
        {[["extract","⚡ EXTRACT"],["browse","◈ BROWSE DB"],["study",`▶ STUDY${deck.length ? ` (${deck.length})` : ""}`]].map(([id, label]) => (
          <button key={id} style={{ ...styles.tab, ...(tab === id ? styles.tabActive : {}) }} onClick={() => setTab(id)}>{label}</button>
        ))}
      </nav>

      <main style={styles.main}>
        {tab === "extract" && (
          <div style={styles.panel}>
            <div style={styles.offlineBadge}>⚡ GROQ AI ACTIVE — Paste any job description. Llama3 extracts technologies and generates custom flashcards merged with the master Q&amp;A database.</div>
            <div style={styles.sectionTitle}>PASTE JOB DESCRIPTION</div>
            <textarea style={styles.textarea} placeholder="Paste the full job posting here..." value={inputText} onChange={e => setInputText(e.target.value)} rows={10} />
            {foundTechs.length > 0 && (
              <div style={styles.foundTechs}>
                <span style={styles.sectionTitle}>DETECTED: </span>
                {foundTechs.map(t => <span key={t} style={styles.techPill}>{t}</span>)}
              </div>
            )}
            <button style={{ ...styles.primaryBtn, opacity: loading || !inputText ? 0.5 : 1 }} disabled={loading || !inputText} onClick={() => extractFromText(inputText)}>
              {loading ? status || "ANALYZING..." : "⚡ EXTRACT + BUILD FLASHCARD DECK"}
            </button>
            <div style={styles.divider}><div style={styles.dividerLine} /><span style={styles.dividerText}>OR SCRAPE A URL</span><div style={styles.dividerLine} /></div>
            <div style={styles.urlRow}>
              <input style={styles.urlInput} placeholder="https://jobs.company.com/role" value={inputUrl} onChange={e => setInputUrl(e.target.value)} />
              <button style={{ ...styles.scrapeBtn, opacity: loading || !inputUrl ? 0.5 : 1 }} disabled={loading || !inputUrl} onClick={extractFromUrl}>{loading ? "..." : "SCRAPE"}</button>
            </div>
            <div style={styles.freeApis}>
              <div style={styles.sectionTitle}>SERVICES IN USE</div>
              <div style={styles.apiRow}><span style={styles.apiName}>Groq (Llama3)</span><span style={styles.apiNote}>Free AI — console.groq.com</span></div>
              <div style={styles.apiRow}><span style={styles.apiName}>r.jina.ai</span><span style={styles.apiNote}>Free URL scraper — no key needed</span></div>
              <div style={styles.apiRow}><span style={styles.apiName}>api.allorigins.win</span><span style={styles.apiNote}>Fallback CORS proxy — free</span></div>
            </div>
            {error && <div style={styles.error}>{error}</div>}
          </div>
        )}

        {tab === "browse" && (
          <div style={styles.panel}>
            <div style={styles.browseHeader}>
              <div style={styles.sectionTitle}>MASTER Q&amp;A DATABASE — {MASTER_QA_DB.length} QUESTIONS</div>
              <div style={styles.filterRow}>
                {["All", ...ALL_TECHS].map(t => (
                  <button key={t} style={{ ...styles.filterChip, ...(filterTech === t ? styles.filterChipActive : {}) }} onClick={() => { setFilterTech(t); setDeckIndex(0); }}>{t}</button>
                ))}
              </div>
              <button style={styles.primaryBtn} onClick={() => { setDeck(browseDeck); setDeckIndex(0); setTab("study"); }}>▶ STUDY THESE {browseDeck.length} CARDS</button>
            </div>
            <div style={styles.dbList}>
              {browseDeck.map((item, i) => (
                <div key={item.id} style={styles.dbRow}>
                  <div style={styles.dbRowLeft}><span style={styles.dbIndex}>#{i+1}</span><span style={styles.dbTech}>{item.tech}</span></div>
                  <div style={styles.dbQuestion}>{item.q}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "study" && (
          <div style={styles.panel}>
            {deck.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>◈</div>
                <div style={styles.emptyText}>NO DECK LOADED</div>
                <div style={styles.emptySub}>Extract from a job posting or load the full database.</div>
                <div style={styles.emptyActions}>
                  <button style={styles.primaryBtn} onClick={() => setTab("extract")}>⚡ Extract from Job Post</button>
                  <button style={styles.ghostBtn} onClick={() => { setDeck(MASTER_QA_DB); setDeckIndex(0); }}>Load All {MASTER_QA_DB.length} Cards</button>
                </div>
              </div>
            ) : (
              <Flashcard card={deck[deckIndex]} index={deckIndex} total={deck.length}
                onNext={() => setDeckIndex(i => Math.min(i+1, deck.length-1))}
                onPrev={() => setDeckIndex(i => Math.max(i-1, 0))} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
