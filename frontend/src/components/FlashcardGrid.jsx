import Flashcard from './Flashcard'

export default function FlashcardGrid({ flashcards }) {
  return (
    <div className="grid">
      {flashcards.map((card, index) => (
        <Flashcard key={index} card={card} />
      ))}
    </div>
  )
}

