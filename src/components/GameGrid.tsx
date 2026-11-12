import type { Game } from '../data/games'
import GameCard from './GameCard'

interface GameGridProps {
  games: Game[]
}

function GameGrid({ games }: GameGridProps) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {games.map((game, index) => (
        <li key={game.id}>
          <GameCard game={game} number={index + 1} />
        </li>
      ))}
    </ul>
  )
}

export default GameGrid
