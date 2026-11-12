import { Link } from 'react-router'
import WordBoard from '../components/games/WordBoard'

function WordGamePage() {
  return (
    <section className="word-game" aria-labelledby="word-game-title">
      <Link to="/games" className="text-link">← Nazad na igre</Link>
      <header className="word-game-header">
        <p className="eyebrow">PET SLOVA / ŠEST POKUŠAJA</p>
        <h1 id="word-game-title">Pogodi reč</h1>
        <p>Pronađi skrivenu reč na srpskom. Svaki red predstavlja jedan pokušaj.</p>
      </header>
      <WordBoard />
      <p className="word-game-note">Tabla je u pripremi. Unos reči stiže u narednom koraku.</p>
    </section>
  )
}

export default WordGamePage
