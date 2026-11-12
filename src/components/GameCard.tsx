import { Link } from 'react-router'
import type { Game } from '../data/games'

interface GameCardProps {
  game: Game
  number: number
}

function GameCard({ game, number }: GameCardProps) {
  return (
    <article className="game-card" data-tone={game.tone}>
      <div className="game-art" aria-hidden="true">
        <span className="game-number">BR. {String(number).padStart(2, '0')}</span>
        <span className="game-mark">{game.mark}</span>
        <span className="game-art-caption">ZAVRZLAMA / KOLEKCIJA IGARA</span>
      </div>
      <div className="game-card-body">
        <p className="eyebrow">{game.category}</p>
        <h2>{game.title}</h2>
        <p className="game-description">{game.description}</p>
        <div className="game-card-footer">
          <span className="coming-soon">U pripremi</span>
          {game.previewPath ? (
            <Link to={game.previewPath} className="text-link">
              Pogledaj tablu <span aria-hidden="true">↗</span>
            </Link>
          ) : (
            <span aria-hidden="true">✳</span>
          )}
        </div>
      </div>
    </article>
  )
}

export default GameCard
