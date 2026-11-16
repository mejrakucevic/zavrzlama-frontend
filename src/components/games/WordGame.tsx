import { useEffect, useEffectEvent, useState } from 'react'
import WordBoard from './WordBoard'
import WordKeyboard from './WordKeyboard'
import { getKeyStatuses, MAX_ATTEMPTS, pickRandomWord, SERBIAN_LETTER, WORD_LENGTH } from './wordLogic'

// "Mozak" igre: ovde je sve stanje i sva pravila.
function WordGame() {
  const [answer, setAnswer] = useState(pickRandomWord)
  const [guesses, setGuesses] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [message, setMessage] = useState('')

  // Izvedene vrednosti: računaju se iz stanja, ne čuvaju se posebno
  const isWon = guesses.includes(answer)
  const isLost = !isWon && guesses.length === MAX_ATTEMPTS
  const isGameOver = isWon || isLost

  function handleKey(key: string) {
    if (isGameOver) return
    setMessage('')

    if (key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1))
      return
    }

    if (key === 'Enter') {
      if (currentGuess.length < WORD_LENGTH) {
        setMessage(`Reč mora imati ${WORD_LENGTH} slova.`)
        return
      }
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')
      return
    }

    if (SERBIAN_LETTER.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(currentGuess + key.toUpperCase())
    }
  }

  function startNewGame() {
    setAnswer(pickRandomWord())
    setGuesses([])
    setCurrentGuess('')
    setMessage('')
  }

  // useEffectEvent: funkcija koja uvek vidi najnovije stanje,
  // a ne tera efekat da se ponovo pokreće
  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return // ne kvari prečice kao Ctrl+R
    if (event.target instanceof HTMLButtonElement) return // fokusirano dugme samo obrađuje Enter
    handleKey(event.key)
  })

  useEffect(() => {
    const listener = (event: KeyboardEvent) => onKeyDown(event)
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [])

  return (
    <div className="word-game-play">
      <WordBoard guesses={guesses} currentGuess={currentGuess} answer={answer} />

      <div className="word-game-status" role="status" aria-live="polite">
        {isWon && <p>Bravo! Reč je pogođena iz {guesses.length}. pokušaja.</p>}
        {isLost && <p>Nema više pokušaja. Tražena reč je bila <strong>{answer}</strong>.</p>}
        {!isGameOver && message && <p>{message}</p>}
      </div>

      {isGameOver && (
        <button type="button" className="retro-button" onClick={startNewGame}>
          Nova igra <span aria-hidden="true">↻</span>
        </button>
      )}

      <WordKeyboard keyStatuses={getKeyStatuses(guesses, answer)} onKey={handleKey} />
    </div>
  )
}

export default WordGame
