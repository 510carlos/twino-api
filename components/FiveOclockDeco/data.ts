import drinksData from "./drinks.json"
import flagData from "./country-flags.json"
import type { GameCardDetails, LocationDetails } from "./types"
import { cities } from "../Countdown/cities"

export const GAMES_URL = "https://games.theweekendisneverover.com"

const drinks = drinksData as unknown as Record<string, { slug: string; recipe: string }>
const flags = flagData as Record<string, string>

const fallbackLocation = { city: "Havana, Cuba", drink: "Daiquiri" }

export const gameCards: GameCardDetails[] = [
  {
    img: "card-crazy-eights",
    title: "Crazy Eights",
    path: "/crazy-eights",
    desc: "A fast-paced classic of matching suits and numbers.",
  },
  {
    img: "card-translation",
    title: "Translation Cards",
    path: "/translation-cards",
    desc: "Learn the local lingo while you sip your cocktail.",
  },
  {
    img: "card-loteria",
    title: "Loteria",
    path: "/loteria",
    desc: "A game of chance, beautiful imagery, and quick wits.",
  },
]

export function deriveLocation(zone: string): LocationDetails {
  const entry = (cities as Record<string, { city: string; drink: string }[]>)[zone]?.[0]
  const { city, drink } = entry || fallbackLocation
  const commaIdx = city.indexOf(", ")
  const country = commaIdx >= 0 ? city.slice(commaIdx + 2) : ""
  const drinkDetails = drinks[drink] || { slug: "rum", recipe: "" }

  return {
    city,
    country,
    drink,
    recipe: drinkDetails.recipe,
    image: `/drinks/${drinkDetails.slug}.webp`,
    iso: flags[country] || "xx",
  }
}
