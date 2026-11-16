import { evaluateGuess, MAX_ATTEMPTS, WORD_LENGTH } from './wordLogic'

interface WordBoardProps {
  guesses: string[]
  currentGuess: string
  answer: string
}

// Tabla samo PRIKAZUJE ono što dobije kroz props. Stanje čuva WordGame.
function WordBoard({ guesses, currentGuess, answer }: WordBoardProps) {
  return (
    <div className="word-board">
      {Array.from({ length: MAX_ATTEMPTS }, (_, row) => {
        const isSubmitted = row < guesses.length
        const rowText = isSubmitted ? guesses[row] : row === guesses.length ? currentGuess : ''
        const statuses = isSubmitted ? evaluateGuess(rowText, answer) : []

        return (
          <div className="word-board-row" key={row}>
            {Array.from({ length: WORD_LENGTH }, (_, column) => (
              <span
                className="word-board-cell"
                data-status={statuses[column]}
                data-filled={rowText[column] ? true : undefined}
                key={column}
              >
                {rowText[column]}
              </span>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default WordBoard
