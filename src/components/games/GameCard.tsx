import type { Game } from '../../data/games'

interface GameCardProps {
  game: Game
}

function GameCard({ game }: GameCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="mb-3 text-xl font-bold text-slate-800">{game.name}</h2>
      <p className="mb-6 grow text-slate-600">{game.description}</p>
      <span className="self-start rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-800">
        U pripremi
      </span>
    </article>
  )
}

export default GameCard
