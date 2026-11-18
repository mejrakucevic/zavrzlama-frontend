import { Link } from 'react-router'
import LoginPrompt from '../components/LoginPrompt'
import RedjeGame from '../components/games/RedjeGame'
import { useAuth } from '../hooks/useAuth'

function RedjeGamePage() {
  const { user, isLoading } = useAuth()

  return (
    <section className="redje-page" aria-labelledby="redje-title">
      <Link to="/games" className="text-link">← Nazad na igre</Link>
      <header className="word-game-header">
        <p className="eyebrow">RETKI ODGOVORI / 5 PITANJA</p>
        <h1 id="redje-title">REĐE!</h1>
        <p>Svi znaju Dunav. Da li se neko setio Pčinje? Ređi tačan odgovor donosi više poena.</p>
      </header>

      {isLoading && <p className="redje-message">Učitavamo…</p>}
      {!isLoading && !user && <LoginPrompt />}
      {!isLoading && user && <RedjeGame key={user.id} />}
    </section>
  )
}

export default RedjeGamePage
