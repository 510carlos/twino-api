import Link from "next/link"
import { GAMES_URL } from "./data"

export function Header() {
  return (
    <header>
      <div className="header-content reveal-item">
        <Link href="/" className="nav-link" aria-label="The Weekend Is Never Over home">
          Home
        </Link>
        <h1 className="logo-area">
          <span className="logo-top text-cream">THE WEEKEND</span>
          <span className="logo-bottom metallic-text">IS NEVER OVER</span>
        </h1>
        <a href={GAMES_URL} className="nav-link">
          Games
        </a>
      </div>
    </header>
  )
}
