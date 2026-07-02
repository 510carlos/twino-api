import type { RefObject } from "react"
import { CountdownPanel } from "./CountdownPanel"
import { DrinkPanel } from "./DrinkPanel"
import { GAMES_URL } from "./data"
import { LocationPanel } from "./LocationPanel"
import type { DigitRefs, LocationDetails } from "./types"

type HeroSectionProps = {
  location: LocationDetails
  digitRefs: DigitRefs
  timerRef: RefObject<HTMLDivElement | null>
}

export function HeroSection({ location, digitRefs, timerRef }: HeroSectionProps) {
  const cityName = location.city.split(",")[0]

  return (
    <section className="hero">
      <div className="particles-container" id="particles" aria-hidden="true" />
      <p className="tagline reveal-item">
        It is 5 o&apos;clock somewhere.
        <br />
        Curated drinks &amp; timeless games for the sophisticated reveler.
      </p>

      <div className="reveal-stack reveal-item" id="reveal-stack">
        <div className="stack-item reveal-item">
          <div className="step-number">1</div>
          <CountdownPanel cityName={cityName ?? location.city} digitRefs={digitRefs} timerRef={timerRef} />
        </div>

        <div className="stack-item reveal-item">
          <div className="step-number">2</div>
          <LocationPanel location={location} />
        </div>

        <div className="stack-item reveal-item">
          <div className="step-number">3</div>
          <DrinkPanel location={location} />
        </div>
      </div>

      <div className="reveal-item">
        <a href={GAMES_URL} className="btn btn-primary">
          Explore {cityName}&apos;s 5 o&apos;clock
        </a>
        <svg
          className="scroll-cue"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}
