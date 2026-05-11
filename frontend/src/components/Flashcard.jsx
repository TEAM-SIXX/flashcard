import { useState } from 'react'

export default function Flashcard({ card }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`flashcard ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flashcard-inner">
        <div className="front">
          <h3>{card.question}</h3>
        </div>

        <div className="back">
          <p>{card.answer}</p>
        </div>
      </div>
    </div>
  )
} 
