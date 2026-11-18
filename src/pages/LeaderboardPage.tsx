import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { getLeaderboard, type Leaderboard, type LeaderboardPeriod } from '../services/api'

const PERIODS: { id: LeaderboardPeriod; label: string }[] = [
  { id: 'day', label: 'Danas' },
  { id: 'week', label: 'Ove nedelje' },
  { id: 'all', label: 'Ukupno' },
]

// Igre koje već upisuju rezultate. Nova igra se samo doda ovde.
const GAMES = [
  { id: 'all', label: 'Sve igre' },
  { id: 'pogodi-rec', label: 'Pogodi reč' },
]

// Rezultat jednog zahteva, zajedno sa "ključem" zahteva na koji se odnosi
type LoadResult = { key: string; data: Leaderboard | null }

function LeaderboardPage() {
  const { user } = useAuth()

  // Izbor perioda i igre čuvamo u adresi (?period=day&game=pogodi-rec),
  // pa se link do tačno određene rang liste može podeliti
  const [searchParams, setSearchParams] = useSearchParams()
  const periodParam = searchParams.get('period')
  const period = PERIODS.some((p) => p.id === periodParam) ? (periodParam as LeaderboardPeriod) : 'week'
  const gameParam = searchParams.get('game')
  const game = GAMES.some((g) => g.id === gameParam) ? gameParam! : 'all'

  const requestKey = `${period}|${game}|${user?.id ?? ''}`
  const [result, setResult] = useState<LoadResult | null>(null)

  // Učitava se dok poslednji stigao rezultat ne odgovara trenutnom izboru
  const isLoading = result?.key !== requestKey
  const leaderboard = isLoading ? null : result.data

  useEffect(() => {
    const controller = new AbortController()

    getLeaderboard(period, game, controller.signal)
      .then((data) => setResult({ key: requestKey, data }))
      .catch(() => {
        if (!controller.signal.aborted) setResult({ key: requestKey, data: null })
      })

    return () => controller.abort()
  }, [period, game, requestKey])

  function choose(name: 'period' | 'game', value: string) {
    const next = new URLSearchParams(searchParams)
    next.set(name, value)
    setSearchParams(next, { replace: true })
  }

  const isMeInTop = leaderboard?.entries.some((entry) => entry.userId === user?.id)

  return (
    <section className="leaderboard-page" aria-labelledby="leaderboard-title">
      <header className="page-intro">
        <p className="eyebrow">TAKMIČENJE / RANG LISTA</p>
        <h1 id="leaderboard-title">Ko je danas<br /><em>najbistriji?</em></h1>
      </header>

      <div className="leaderboard-filters">
        <div className="segmented" role="group" aria-label="Period">
          {PERIODS.map((p) => (
            <button
              type="button"
              key={p.id}
              aria-pressed={period === p.id}
              onClick={() => choose('period', p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <label className="leaderboard-select">
          Igra
          <select value={game} onChange={(event) => choose('game', event.target.value)}>
            {GAMES.map((g) => (
              <option key={g.id} value={g.id}>{g.label}</option>
            ))}
          </select>
        </label>
      </div>

      {isLoading && <p className="leaderboard-message">Učitavamo rang listu…</p>}

      {!isLoading && !leaderboard && (
        <p className="leaderboard-message">Rang lista trenutno nije dostupna. Pokušaj ponovo malo kasnije.</p>
      )}

      {leaderboard && leaderboard.entries.length === 0 && (
        <p className="leaderboard-message">
          Još nema rezultata za ovaj period. <Link to="/games" className="text-link">Budi prvi/a!</Link>
        </p>
      )}

      {leaderboard && leaderboard.entries.length > 0 && (
        <div className="leaderboard-table-wrap">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th scope="col">Mesto</th>
                <th scope="col">Igrač</th>
                <th scope="col">Partije</th>
                <th scope="col">Poeni</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.entries.map((entry) => (
                <tr key={entry.userId} data-me={entry.userId === user?.id ? true : undefined}>
                  <td className="leaderboard-rank">{entry.rank}.</td>
                  <td>@{entry.username}</td>
                  <td>{entry.gamesPlayed}</td>
                  <td className="leaderboard-score">{entry.totalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tvoje mesto, ako nisi među prikazanima */}
      {leaderboard?.me && !isMeInTop && (
        <p className="leaderboard-me">
          Tvoje mesto: <strong>{leaderboard.me.rank}.</strong> sa {leaderboard.me.totalScore} poena
          ({leaderboard.me.gamesPlayed} {leaderboard.me.gamesPlayed === 1 ? 'partija' : 'partije'})
        </p>
      )}

      {!user && (
        <p className="leaderboard-me">
          <Link to="/prijava" className="text-link">Prijavi se</Link> da bi se i tvoji rezultati našli ovde.
        </p>
      )}
    </section>
  )
}

export default LeaderboardPage
