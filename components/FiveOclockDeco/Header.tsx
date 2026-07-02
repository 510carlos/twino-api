import { GAMES_URL } from "./data"

export function Header() {
  return (
    <header>
      <div className="header-content reveal-item">
        <a href="#" className="nav-link">
          Home
        </a>
        <h1 className="logo-area">
          <span className="logo-top text-cream">THE WEEKEND</span>
          <span className="logo-bottom metallic-text">IS NEVER OVER</span>
        </h1>
        <a href={GAMES_URL} className="nav-link">
          Shop
        </a>
      </div>
    </header>
  )
}
