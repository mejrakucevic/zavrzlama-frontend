import GameGrid from '../components/GameGrid'
import { games } from '../data/games'

function GamesPage() {
  return (
    <>
      <section className="page-intro" aria-labelledby="games-title">
        <p className="eyebrow">KOLEKCIJA / {games.length} IGRE</p>
        <h1 id="games-title">Pronađi svoju<br /><em>zavrzlamu.</em></h1>
        <p>Pogodi reč, seti se odgovora kog se niko nije setio, sastavi najdužu reč ili pronađi skrivenu državu. Svaki dan novi izazov i nova rang lista.</p>
        <p className="availability-note">Pogodi reč i REĐE! možeš da igraš već danas. Ostale igre su u pripremi.</p>
      </section>
      <GameGrid games={games} />
    </>
  )
}

export default GamesPage
