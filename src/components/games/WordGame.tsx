import { useEffect, useEffectEvent, useState } from 'react'
import { getErrorMessage, getWordGameToday, submitWordGuess } from '../../services/api'
import WordBoard from './WordBoard'
import WordKeyboard from './WordKeyboard'
import { getKeyStatuses, MAX_ATTEMPTS, SERBIAN_LETTER, WORD_LENGTH, type GuessResult } from './wordLogic'
import { loadWordGame, saveWordGame } from './wordStorage'

type LoadState = 'loading' | 'ready' | 'error'

// "Mozak" igre: stanje i pravila. Tajnu reč zna samo server.
function WordGame() {
  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [loadAttempt, setLoadAttempt] = useState(0)
  const [date, setDate] = useState('')
  const [guesses, setGuesses] = useState<GuessResult[]>([])
  const [answer, setAnswer] = useState<string>()
  const [currentGuess, setCurrentGuess] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Izvedene vrednosti
  const isWon = guesses.some((guess) => guess.statuses.every((status) => status === 'correct'))
  const isLost = !isWon && guesses.length === MAX_ATTEMPTS
  const isGameOver = isWon || isLost

  // 1. Kad se igra prikaže: pitaj server koji je danas dan, pa učitaj sačuvan napredak
  useEffect(() => {
    const controller = new AbortController()

    getWordGameToday(controller.signal)
      .then((today) => {
        const saved = loadWordGame(today.date)
        setDate(today.date)
        setGuesses(saved.guesses)
        setAnswer(saved.answer)
        setLoadState('ready')
      })
      .catch(() => {
        if (!controller.signal.aborted) setLoadState('error')
      })

    return () => controller.abort()
  }, [loadAttempt])

  // 2. Pošalji pokušaj serveru i sačekaj boje
  async function submitGuess() {
    setIsSubmitting(true)

    try {
      const result = await submitWordGuess(currentGuess, guesses.length + 1)
      const newGuesses = [...guesses, { word: currentGuess, statuses: result.statuses }]

      setGuesses(newGuesses)
      setAnswer(result.answer)
      setCurrentGuess('')
      saveWordGame(date, { guesses: newGuesses, answer: result.answer })
    } catch (error) {
      setMessage(getErrorMessage(error)) // npr. "Ova reč nije u rečniku."
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleKey(key: string) {
    if (loadState !== 'ready' || isGameOver || isSubmitting) return
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
      void submitGuess()
      return
    }

    if (SERBIAN_LETTER.test(key) && currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(currentGuess + key.toUpperCase())
    }
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

  if (loadState === 'loading') {
    return <p className="word-game-status">Učitavamo današnju reč…</p>
  }

  if (loadState === 'error') {
    return (
      <div className="word-game-play">
        <p className="word-game-status">Server trenutno nije dostupan, pa igra ne može da počne.</p>
        <button
          type="button"
          className="retro-button"
          onClick={() => {
            setLoadState('loading')
            setLoadAttempt((previous) => previous + 1)
          }}
        >
          Pokušaj ponovo <span aria-hidden="true">↻</span>
        </button>
      </div>
    )
  }

  return (
    <div className="word-game-play">
      <WordBoard guesses={guesses} currentGuess={currentGuess} />

      <div className="word-game-status" role="status" aria-live="polite">
        {isWon && <p>Bravo! Reč je pogođena iz {guesses.length}. pokušaja. Nova reč stiže sutra.</p>}
        {isLost && (
          <p>
            Nema više pokušaja. Tražena reč je bila <strong>{answer}</strong>. Nova reč stiže sutra.
          </p>
        )}
        {!isGameOver && isSubmitting && <p>Proveravamo…</p>}
        {!isGameOver && !isSubmitting && message && <p>{message}</p>}
      </div>

      <WordKeyboard keyStatuses={getKeyStatuses(guesses)} onKey={handleKey} />
    </div>
  )
}

export default WordGame
