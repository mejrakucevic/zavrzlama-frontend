const MAX_ATTEMPTS = 6
const WORD_LENGTH = 5

function WordBoard() {
  return (
    <div
      className="word-board"
      role="img"
      aria-label="Prazna tabla: šest pokušaja sa po pet polja za slova."
    >
      {Array.from({ length: MAX_ATTEMPTS }, (_, row) => (
        <div className="word-board-row" key={row}>
          {Array.from({ length: WORD_LENGTH }, (_, column) => (
            <span className="word-board-cell" key={column} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default WordBoard
