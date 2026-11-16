import { Link } from 'react-router'
import WordGame from '../components/games/WordGame'

function WordGamePage() {
  return (
    <section className="word-game" aria-labelledby="word-game-title">
      <Link to="/games" className="text-link">← Nazad na igre</Link>
      <header className="word-game-header">
        <p className="eyebrow">PET SLOVA / ŠEST POKUŠAJA</p>
        <h1 id="word-game-title">Pogodi reč</h1>
        <p>Pronađi skrivenu reč na srpskom. Svaki red predstavlja jedan pokušaj.</p>
      </header>
      <WordGame />
      <p className="word-game-note">
        Zeleno: slovo je na pravom mestu. Žuto: slovo postoji, ali na drugom mestu. Sivo: slova nema u reči.
      </p>
    </section>
  )
}

export default WordGamePage
