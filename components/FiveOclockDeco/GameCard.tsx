import { GAMES_URL } from "./data"
import type { GameCardDetails } from "./types"

type GameCardProps = {
  game: GameCardDetails
}

export function GameCard({ game }: GameCardProps) {
  const gameUrl = `${GAMES_URL}${game.path}`

  return (
    <div className="deco-panel game-card reveal-item">
      <a href={gameUrl} className="card-img-container" aria-label={game.title}>
        <img src={`/games/${game.img}.webp`} alt={game.title} />
      </a>
      <h3>
        <a href={gameUrl} className="game-title-link">
          {game.title}
        </a>
      </h3>
      <p>{game.desc}</p>
      <a href={gameUrl} className="btn">
        Play
      </a>
    </div>
  )
}
