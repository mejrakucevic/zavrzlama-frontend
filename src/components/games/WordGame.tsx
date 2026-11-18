import { useEffect, useEffectEvent, useState } from 'react'
import { Link } from 'react-router'
import { getErrorMessage, getWordGameToday, submitWordGuess, type WordGameState } from '../../services/api'
import WordBoard from './WordBoard'
import WordKeyboard from './WordKeyboard'
import { getKeyStatuses, SERBIAN_LETTER, WORD_LENGTH } from './wordLogic'

type LoadState = 'loading' | 'ready' | 'error'

// "Mozak" igre. Pravila i tajnu reč zna server; ovde je samo unos i prikaz.
// Komponenta se prikazuje samo prijavljenom korisniku (vidi WordGamePage).
function WordGame() {
  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [loadAttempt, setLoadAttempt] = useState(0)
  const [game, setGame] = useState<WordGameState>({ guesses: [], status: 'playing', score: 0 })
  const [currentGuess, setCurrentGuess] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isGameOver = game.status !== 'playing'

  // 1. Učitaj današnju partiju sa servera (i dosadašnje pokušaje, ako postoje)
  useEffect(() => {
    const controller = new AbortController()

    getWordGameToday(controller.signal)
      .then((today) => {
        setGame(today.game)
        setLoadState('ready')
      })
      .catch(() => {
        if (!controller.signal.aborted) setLoadState('error')
      })

    return () => controller.abort()
  }, [loadAttempt])

  // 2. Pošalji pokušaj. Server vraća celo novo stanje partije.
  async function submitGuess() {
    setIsSubmitting(true)

    try {
      setGame(await submitWordGuess(currentGuess))
      setCurrentGuess('')
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
      <WordBoard guesses={game.guesses} currentGuess={currentGuess} />

      <div className="word-game-status" role="status" aria-live="polite">
        {game.status === 'won' && (
          <p>
            Bravo! Reč je pogođena iz {game.guesses.length}. pokušaja. Osvojeno poena: <strong>{game.score}</strong>.
          </p>
        )}
        {game.status === 'lost' && (
          <p>
            Nema više pokušaja. Tražena reč je bila <strong>{game.answer}</strong>. Osvojeno poena: 0.
          </p>
        )}
        {isGameOver && (
          <p className="word-game-next">
            Nova reč stiže sutra.{' '}
            <Link to="/rang-lista?period=day&game=pogodi-rec" className="text-link">
              Pogledaj današnju rang listu <span aria-hidden="true">↗</span>
            </Link>
          </p>
        )}
        {!isGameOver && isSubmitting && <p>Proveravamo…</p>}
        {!isGameOver && !isSubmitting && message && <p>{message}</p>}
      </div>

      <WordKeyboard keyStatuses={getKeyStatuses(game.guesses)} onKey={handleKey} />
    </div>
  )
}

export default WordGame
