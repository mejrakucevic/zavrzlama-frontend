import { useEffect, useEffectEvent, useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import {
  getErrorMessage,
  getRedjeToday,
  startNextRedjeQuestion,
  submitRedjeAnswer,
  type RedjeGameState,
  type RedjeResult,
} from '../../services/api'

type LoadState = 'loading' | 'ready' | 'error'

// 0.004 → "<1%", 0.35 → "35%"
function formatShare(share: number) {
  const percent = Math.round(share * 100)
  return percent < 1 ? '<1%' : `${percent}%`
}

function RedjeGame() {
  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [game, setGame] = useState<RedjeGameState | null>(null)
  const [questionCount, setQuestionCount] = useState(5)
  const [timeLimitMs, setTimeLimitMs] = useState(20_000)
  const [lastResult, setLastResult] = useState<RedjeResult | null>(null)
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [isBusy, setIsBusy] = useState(false)

  // Tajmer: rok računamo prema vremenu koje je javio server
  const [deadline, setDeadline] = useState<number | null>(null)
  const [now, setNow] = useState(() => Date.now())
  const remainingMs = deadline === null ? 0 : Math.max(0, deadline - now)

  function applyGame(next: RedjeGameState) {
    setGame(next)
    setDeadline(next.current ? Date.now() + next.current.remainingMs : null)
    setNow(Date.now())
  }

  // 1. Učitaj današnju partiju (ako je pitanje bilo otvoreno, tajmer nastavlja gde je stao)
  useEffect(() => {
    const controller = new AbortController()

    getRedjeToday(controller.signal)
      .then((today) => {
        setQuestionCount(today.questionCount)
        setTimeLimitMs(today.timeLimitMs)
        applyGame(today.game)
        setLoadState('ready')
      })
      .catch(() => {
        if (!controller.signal.aborted) setLoadState('error')
      })

    return () => controller.abort()
  }, [])

  // 2. Otvori sledeće pitanje
  async function startQuestion() {
    setIsBusy(true)
    setError('')
    try {
      applyGame(await startNextRedjeQuestion())
      setLastResult(null)
      setInput('')
    } catch (startError) {
      setError(getErrorMessage(startError))
    } finally {
      setIsBusy(false)
    }
  }

  // 3. Pošalji odgovor (ručno, ili automatski kad istekne vreme)
  async function sendAnswer() {
    if (isBusy) return
    setIsBusy(true)
    setError('')
    try {
      const response = await submitRedjeAnswer(input)
      setLastResult(response.result)
      applyGame(response.game)
    } catch (sendError) {
      setError(getErrorMessage(sendError))
    } finally {
      setIsBusy(false)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void sendAnswer()
  }

  // Kad vreme istekne, pošalji ono što je igrač stigao da ukuca
  const onTimeUp = useEffectEvent(() => {
    void sendAnswer()
  })

  // Tajmer kuca 5 puta u sekundi dok je pitanje otvoreno
  useEffect(() => {
    if (deadline === null) return

    const timer = setInterval(() => {
      setNow(Date.now())
      if (Date.now() >= deadline) {
        clearInterval(timer)
        onTimeUp()
      }
    }, 200)

    return () => clearInterval(timer)
  }, [deadline])

  if (loadState === 'loading') return <p className="redje-message">Učitavamo današnja pitanja…</p>

  if (loadState === 'error' || !game) {
    return <p className="redje-message">Server trenutno nije dostupan. Osveži stranicu malo kasnije.</p>
  }

  const answeredCount = game.answers.length

  // ----- Otvoreno pitanje -----
  if (game.current) {
    const secondsLeft = Math.ceil(remainingMs / 1000)

    return (
      <div className="redje-card">
        <p className="eyebrow">PITANJE {game.current.index + 1} / {questionCount}</p>
        <h2 className="redje-prompt">{game.current.prompt}</h2>

        <div className="redje-timer" aria-hidden="true">
          <span style={{ width: `${(remainingMs / timeLimitMs) * 100}%` }} data-low={secondsLeft <= 5 ? true : undefined} />
        </div>
        <p className="redje-seconds" aria-live="off">{secondsLeft} s</p>

        <form className="redje-form" onSubmit={handleSubmit}>
          <input
            autoFocus
            maxLength={60}
            autoComplete="off"
            aria-label="Tvoj odgovor"
            placeholder="Upiši odgovor…"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={isBusy}
          />
          <button type="submit" className="retro-button" disabled={isBusy}>
            Odgovori <span aria-hidden="true">↗</span>
          </button>
        </form>
        {error && <p className="form-error" role="alert">{error}</p>}
      </div>
    )
  }

  // ----- Rezultat poslednjeg odgovora -----
  if (lastResult) {
    const isLast = game.status === 'finished'

    return (
      <div className="redje-card">
        <p className="eyebrow">PITANJE {answeredCount} / {questionCount}</p>
        <h2 className="redje-prompt">{game.answers[answeredCount - 1]?.prompt}</h2>

        {lastResult.timedOut && <p className="redje-verdict" data-kind="miss">Vreme je isteklo. 0 poena.</p>}
        {!lastResult.timedOut && !lastResult.matched && (
          <p className="redje-verdict" data-kind="miss">
            „{lastResult.input || '…'}“ nije među tačnim odgovorima. 0 poena.
          </p>
        )}
        {lastResult.matched && lastResult.share !== null && (
          <p className="redje-verdict" data-kind="hit">
            <strong>{lastResult.matched}</strong>: to je odgovorilo {formatShare(lastResult.share)} igrača.
            <span className="redje-points">+{lastResult.points}</span>
          </p>
        )}

        <div className="redje-top">
          <p className="eyebrow">NAJČEŠĆI ODGOVORI</p>
          <ol>
            {lastResult.topAnswers.map((answer) => (
              <li key={answer.text}>
                <span>{answer.text}</span>
                <span>{formatShare(answer.share)}</span>
              </li>
            ))}
          </ol>
        </div>

        {isLast ? (
          <button type="button" className="retro-button" onClick={() => setLastResult(null)}>
            Ukupan rezultat <span aria-hidden="true">↗</span>
          </button>
        ) : (
          <button type="button" className="retro-button" onClick={() => void startQuestion()} disabled={isBusy}>
            Sledeće pitanje <span aria-hidden="true">↗</span>
          </button>
        )}
        {error && <p className="form-error" role="alert">{error}</p>}
      </div>
    )
  }

  // ----- Kraj igre -----
  if (game.status === 'finished') {
    return (
      <div className="redje-card">
        <p className="eyebrow">DANAŠNJI REZULTAT</p>
        <p className="redje-total">{game.score}<small> / {questionCount * 100}</small></p>

        <ul className="redje-summary">
          {game.answers.map((answer) => (
            <li key={answer.prompt}>
              <span className="redje-summary-prompt">{answer.prompt}</span>
              <span>{answer.timedOut ? 'vreme isteklo' : answer.matched ?? `„${answer.input}“ ✗`}</span>
              <strong>{answer.points}</strong>
            </li>
          ))}
        </ul>

        <p className="redje-next">Nova pitanja stižu sutra.</p>
        <Link to="/rang-lista?period=day&game=redje" className="text-link">
          Pogledaj današnju rang listu <span aria-hidden="true">↗</span>
        </Link>
      </div>
    )
  }

  // ----- Početak (ili nastavak posle osvežavanja stranice) -----
  return (
    <div className="redje-card">
      {answeredCount === 0 ? (
        <>
          <p className="eyebrow">PRAVILA</p>
          <ul className="redje-rules">
            <li>Čeka te {questionCount} pitanja, isto za sve igrače.</li>
            <li>Na svako imaš {timeLimitMs / 1000} sekundi i jedan odgovor.</li>
            <li>Tačan odgovor donosi više poena što je ređi. Najčešći odgovori vrede najmanje.</li>
            <li>Tajmer kreće kad otvoriš pitanje i ne staje ako osvežiš stranicu.</li>
          </ul>
        </>
      ) : (
        <p className="redje-next">Odgovoreno {answeredCount} od {questionCount} pitanja. Do sada: {game.score} poena.</p>
      )}
      <button type="button" className="retro-button" onClick={() => void startQuestion()} disabled={isBusy}>
        {answeredCount === 0 ? 'Počni' : 'Sledeće pitanje'} <span aria-hidden="true">↗</span>
      </button>
      {error && <p className="form-error" role="alert">{error}</p>}
    </div>
  )
}

export default RedjeGame
