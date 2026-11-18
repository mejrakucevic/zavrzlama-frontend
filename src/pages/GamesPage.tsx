import GameGrid from '../components/GameGrid'
import { games } from '../data/games'

function GamesPage() {
  return (
    <>
      <section className="page-intro" aria-labelledby="games-title">
        <p className="eyebrow">KOLEKCIJA / {games.length} IGRE</p>
        <h1 id="games-title">Pronađi svoju<br /><em>zavrzlamu.</em></h1>
        <p>Sastavi najdužu reč, pronađi skrivenu državu ili pogodi reč na srpskom. Tri igre za dobru malu pauzu.</p>
        <p className="availability-note">Pogodi reč možeš da igraš već danas. Ostale igre su u pripremi.</p>
      </section>
      <GameGrid games={games} />
    </>
  )
}

export default GamesPage
