import type { RefObject } from "react"

export type LocationDetails = {
  city: string
  country: string
  drink: string
  recipe: string
  image: string
  iso: string
}

export type DigitRefs = {
  m1: RefObject<HTMLDivElement | null>
  m2: RefObject<HTMLDivElement | null>
  s1: RefObject<HTMLDivElement | null>
  s2: RefObject<HTMLDivElement | null>
}

export type GameCardDetails = {
  img: string
  title: string
  path: string
  desc: string
}
