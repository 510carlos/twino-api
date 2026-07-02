import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { createRef } from "react"
import { CountdownPanel } from "./CountdownPanel"
import { DrinkPanel } from "./DrinkPanel"
import { GameCard } from "./GameCard"
import { gameCards } from "./data"
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
  render: () => (
    <CountdownPanel
      cityName="Lima"
      digitRefs={{
        m1: createRef<HTMLDivElement>(),
        m2: createRef<HTMLDivElement>(),
        s1: createRef<HTMLDivElement>(),
        s2: createRef<HTMLDivElement>(),
      }}
      timerRef={createRef<HTMLDivElement>()}
    />
  ),
}

export const Location: Story = {
  render: () => <LocationPanel location={sampleLocation} />,
}

export const Drink: Story = {
  render: () => <DrinkPanel location={sampleLocation} />,
}

export const Game: Story = {
  render: () => <GameCard game={gameCards[0] ?? gameCards[1]!} />,
}
