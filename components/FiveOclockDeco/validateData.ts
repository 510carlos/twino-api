import drinksData from "./drinks.json"
import flagData from "./country-flags.json"
import { gameCards } from "./data"
import { cities } from "../Countdown/cities"

const drinks = drinksData as Record<string, unknown>
const flags = flagData as Record<string, string>

function isDrink(value: unknown): value is { slug?: string; recipe?: string } {
  return typeof value === "object" && value !== null && "slug" in value
}

export function validateDecoData(): string[] {
  const errors: string[] = []
  const drinkEntries = Object.entries(drinks).filter((entry): entry is [string, { slug?: string; recipe?: string }] =>
    isDrink(entry[1])
  )
  const drinkSlugs = new Set(drinkEntries.map(([, drink]) => drink.slug))

  drinkEntries.forEach(([name, drink]) => {
    if (!drink.slug) errors.push(`Drink "${name}" is missing a slug.`)
    if (!drink.recipe) errors.push(`Drink "${name}" is missing a recipe.`)
  })

  Object.values(cities)
    .flat()
    .forEach(({ city, drink }) => {
      const country = city.split(", ")[1]
      if (!isDrink(drinks[drink])) errors.push(`City "${city}" references missing drink "${drink}".`)
      if (!country) errors.push(`City "${city}" is missing a country segment.`)
      else if (!flags[country]) errors.push(`City "${city}" references missing flag for "${country}".`)
    })

  gameCards.forEach((game) => {
    if (!game.img) errors.push(`Game "${game.title}" is missing an image slug.`)
    if (!game.path.startsWith("/")) errors.push(`Game "${game.title}" path must start with "/".`)
    if (!game.title) errors.push(`Game with path "${game.path}" is missing a title.`)
    if (!game.desc) errors.push(`Game "${game.title}" is missing a description.`)
  })

  if (drinkSlugs.has(undefined)) errors.push("One or more drinks have invalid image slugs.")

  return errors
}
