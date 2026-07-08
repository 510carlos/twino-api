import { gameCards } from "./data"
import { GameCard } from "./GameCard"

export function GameNightSection() {
  return (
    <section className="game-night">
      <div className="section-divider reveal-item">
        <h2 className="metallic-text">GAME NIGHT</h2>
      </div>
      <p className="game-subtitle reveal-item">Gather your friends. Game on.</p>
      <div className="cards-grid">
        {gameCards.map((game) => (
          <GameCard game={game} key={game.img} />
        ))}
      </div>
      <p className="no-account-note reveal-item">No account needed - play in seconds.</p>
    </section>
  )
}
