import spacetime from "spacetime"
import { cities } from "./cities"

export const calculateTimeLeft = () => {
  const now = new Date()
  const target = new Date()
  target.setHours(17, 0, 0, 0) // Set target to 5:00 PM today

  if (now > target) {
    target.setDate(target.getDate() + 1) // If it's past 5:00 PM, set the target to 5:00 PM the next day
  }

  const difference = target.getTime() - now.getTime()
  const minutes = Math.floor((difference / 1000 / 60) % 60)
  const seconds = Math.floor((difference / 1000) % 60)

  return { minutes, seconds }
}

export const getCurrentTimeZone = () => {
  const now = spacetime.now()
  const zones = Object.keys(cities)

  // Find the time zone within the cities data that is currently at 5:00 PM
  const currentZone = zones.find((zone) => now.goto(zone).hour() === 17)

  return currentZone || "No matching time zone found"
}

export const getNextTimeZone = (currentZone) => {
  const zones = Object.keys(cities)
  const currentIndex = zones.indexOf(currentZone)
  const nextIndex = (currentIndex + 1) % zones.length
  return zones[nextIndex]
}
