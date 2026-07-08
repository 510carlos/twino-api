import { expect, test } from "@playwright/test"
import { existsSync } from "node:fs"
import { join } from "node:path"
import drinksData from "../../components/FiveOclockDeco/drinks.json"
import flagData from "../../components/FiveOclockDeco/country-flags.json"
import { gameCards } from "../../components/FiveOclockDeco/data"
import { validateDecoData } from "../../components/FiveOclockDeco/validateData"

const drinks = drinksData as unknown as Record<string, unknown>
const flags = flagData as Record<string, string>

function isDrink(value: unknown): value is { slug: string; recipe: string } {
  return typeof value === "object" && value !== null && "slug" in value
}

test("static landing page data points to valid entries", () => {
  expect(validateDecoData()).toEqual([])
})

test("referenced public assets exist", () => {
  const root = process.cwd()
  const drinkSlugs = Object.values(drinks)
    .filter(isDrink)
    .map((drink) => drink.slug)
  const flagCodes = [...Object.values(flags).filter((code) => /^[a-z]{2}$/.test(code)), "xx"]
  const gameSlugs = gameCards.map((game) => game.img)

  drinkSlugs.forEach((slug) => {
    expect(existsSync(join(root, "public", "drinks", `${slug}.webp`)), `Missing drink image ${slug}.webp`).toBe(true)
  })

  flagCodes.forEach((code) => {
    expect(existsSync(join(root, "public", "flags", `${code}.svg`)), `Missing flag image ${code}.svg`).toBe(true)
  })

  gameSlugs.forEach((slug) => {
    expect(existsSync(join(root, "public", "games", `${slug}.webp`)), `Missing game image ${slug}.webp`).toBe(true)
  })
})
