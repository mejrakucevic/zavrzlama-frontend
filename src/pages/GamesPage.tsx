import GameCard from '../components/games/GameCard'
import { games } from '../data/games'

function GamesPage() {
  return (
    <>
      <h1 className="mb-4 text-4xl font-bold text-violet-700">Igre</h1>
      <p className="mb-8 text-lg text-slate-600">
        Upoznaj igre koje pripremamo za Zavrzlamu.
      </p>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <li key={game.id}>
            <GameCard game={game} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default GamesPage
