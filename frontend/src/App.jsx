import { useState } from 'react'
import axios from 'axios'
import FlashcardGrid from './components/FlashcardGrid'

export default function App() {
  const [jobText, setJobText] = useState('')
  const [jobUrl, setJobUrl] = useState('')
  const [flashcards, setFlashcards] = useState([])
  const [loading, setLoading] = useState(false)

  const generateFromText = async () => {
    if (!jobText) return

    setLoading(true)

    const res = await axios.post(
      'http://localhost:5000/api/extract/text',
      { text: jobText }
    )

    setFlashcards(res.data.flashcards)
    setLoading(false)
  }

  const generateFromUrl = async () => {
    if (!jobUrl) return

    setLoading(true)

    const res = await axios.post(
      'http://localhost:5000/api/extract/url',
      { url: jobUrl }
    )

    setFlashcards(res.data.flashcards)
    setLoading(false)
  }

  return (
    <div className="container">
      <h1>Job Tech Extractor</h1>

      <div className="panel">
        <textarea
          placeholder="Paste job description..."
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
        />

        <button onClick={generateFromText}>
          Generate From Text
        </button>
      </div>

      <div className="panel">
        <input
          type="text"
          placeholder="Paste job URL..."
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
        />

        <button onClick={generateFromUrl}>
          Scrape URL + Generate
        </button>
      </div>

      {loading && <p>Generating flashcards...</p>}

      <FlashcardGrid flashcards={flashcards} />
    </div>
  )
}
