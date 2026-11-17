import { MAX_ATTEMPTS, WORD_LENGTH, type GuessResult } from './wordLogic'

interface WordBoardProps {
  guesses: GuessResult[]
  currentGuess: string
}

// Tabla samo PRIKAZUJE ono što dobije kroz props. Stanje čuva WordGame.
function WordBoard({ guesses, currentGuess }: WordBoardProps) {
  return (
    <div className="word-board">
      {Array.from({ length: MAX_ATTEMPTS }, (_, row) => {
        const submitted = guesses[row] // undefined ako red još nije poslat
        const rowText = submitted ? submitted.word : row === guesses.length ? currentGuess : ''

        return (
          <div className="word-board-row" key={row}>
            {Array.from({ length: WORD_LENGTH }, (_, column) => (
              <span
                className="word-board-cell"
                data-status={submitted?.statuses[column]}
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
