const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const router = express.Router()

const technologies = [
  'React',
  'Node.js',
  'Express',
  'MongoDB',
  'PostgreSQL',
  'AWS',
  'Docker',
  'Kubernetes',
  'Python',
  'JavaScript',
  'TypeScript',
  'Redis',
  'GraphQL',
  'REST API',
  'Next.js',
  'SQL'
]

function generateFlashcards(text) {
  const found = technologies.filter(tech =>
    text.toLowerCase().includes(tech.toLowerCase())
  )

  return found.map(tech => ({
    question: `Explain ${tech} and how you would use it in production.`,
    answer: `${tech} is commonly used in modern software engineering and interviewers may ask architecture, scaling, optimization, and implementation questions about it.`
  }))
}

router.post('/text', (req, res) => {
  const text = req.body.text || ''

  const flashcards = generateFlashcards(text)

  res.json({ flashcards })
})

router.post('/url', async (req, res) => {
  try {
    const url = req.body.url

    const response = await axios.get(url)

    const $ = cheerio.load(response.data)

    const text = $('body').text()

    const flashcards = generateFlashcards(text)

    res.json({ flashcards })

  } catch (err) {
    res.status(500).json({
      error: 'Failed to scrape URL'
    })
  }
})

module.exports = router
