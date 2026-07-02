import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { createRef } from "react"
import { CountdownPanel } from "./CountdownPanel"
import { DrinkPanel } from "./DrinkPanel"
import { Footer } from "./Footer"
import { GameCard } from "./GameCard"
import { GameNightSection } from "./GameNightSection"
import { gameCards } from "./data"
import { HeroSection } from "./HeroSection"
import { LocationPanel } from "./LocationPanel"
import type { LocationDetails } from "./types"

const sampleLocation: LocationDetails = {
  city: "Lima, Peru",
  country: "Peru",
  drink: "Pisco Sour",
  recipe: "Pisco, lime juice, syrup, egg white, and bitters shaken cold.",
  image: "/drinks/pisco-sour.webp",
  iso: "pe",
}

const longLocation: LocationDetails = {
  city: "Port-aux-Francais, French Southern and Antarctic Lands",
  country: "French Southern and Antarctic Lands",
  drink: "Greenlandic Coffee",
  recipe: "A layered warm cocktail with coffee, whisky, Kahlua, Grand Marnier, whipped cream, and a theatrical flame.",
  image: "/drinks/greenlandic-coffee.webp",
  iso: "fr",
}

const fallbackLocation: LocationDetails = {
  city: "Fallback Harbor, Unknown",
  country: "Unknown",
  drink: "House Pour",
  recipe: "Used to check layout behavior when data falls back to neutral assets.",
  image: "/drinks/rum.webp",
  iso: "xx",
}

function makeDigitRefs() {
  return {
    m1: createRef<HTMLDivElement>(),
    m2: createRef<HTMLDivElement>(),
    s1: createRef<HTMLDivElement>(),
    s2: createRef<HTMLDivElement>(),
  }
}

const meta = {
  title: "Five Oclock Deco/Panels",
  parameters: {
    backgrounds: {
      default: "deco",
      values: [{ name: "deco", value: "#1A211C" }],
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Countdown: Story = {
  render: () => <CountdownPanel cityName="Lima" digitRefs={makeDigitRefs()} timerRef={createRef<HTMLDivElement>()} />,
}

export const Location: Story = {
  render: () => <LocationPanel location={sampleLocation} />,
}

export const Drink: Story = {
  render: () => <DrinkPanel location={sampleLocation} />,
}

export const LongLocationAndDrink: Story = {
  render: () => (
    <div className="reveal-stack" style={{ paddingLeft: 0 }}>
      <div className="stack-item">
        <LocationPanel location={longLocation} />
      </div>
      <div className="stack-item">
        <DrinkPanel location={longLocation} />
      </div>
    </div>
  ),
}

export const FallbackAssets: Story = {
  render: () => (
    <div className="reveal-stack" style={{ paddingLeft: 0 }}>
      <div className="stack-item">
        <LocationPanel location={fallbackLocation} />
      </div>
      <div className="stack-item">
        <DrinkPanel location={fallbackLocation} />
      </div>
    </div>
  ),
}

export const Game: Story = {
  render: () => <GameCard game={gameCards[0] ?? gameCards[1]!} />,
}

export const GameNight: Story = {
  render: () => <GameNightSection />,
}

export const Hero: Story = {
  render: () => (
    <HeroSection location={sampleLocation} digitRefs={makeDigitRefs()} timerRef={createRef<HTMLDivElement>()} />
  ),
}

export const PageFooter: Story = {
  render: () => <Footer />,
}
