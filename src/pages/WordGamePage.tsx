import { Link } from 'react-router'
import LoginPrompt from '../components/LoginPrompt'
import WordGame from '../components/games/WordGame'
import { useAuth } from '../hooks/useAuth'

function WordGamePage() {
  const { user, isLoading } = useAuth()

  return (
    <section className="word-game" aria-labelledby="word-game-title">
      <Link to="/games" className="text-link">← Nazad na igre</Link>
      <header className="word-game-header">
        <p className="eyebrow">PET SLOVA / ŠEST POKUŠAJA</p>
        <h1 id="word-game-title">Pogodi reč</h1>
        <p>Pronađi skrivenu reč na srpskom. Svaki red predstavlja jedan pokušaj.</p>
      </header>

      {isLoading && <p className="word-game-status">Učitavamo…</p>}
      {!isLoading && !user && <LoginPrompt />}
      {/* key: kad se promeni korisnik, React pravi potpuno novu igru (sa praznim stanjem) */}
      {!isLoading && user && <WordGame key={user.id} />}

      <p className="word-game-note">
        Zeleno: slovo je na pravom mestu. Žuto: slovo postoji, ali na drugom mestu. Sivo: slova nema u reči.
        <br />
        Poeni: pogodak iz 1. pokušaja 100, iz 2. 80, iz 3. 60, iz 4. 40, iz 5. 30, iz 6. 20.
      </p>
    </section>
  )
}

export default WordGamePage
