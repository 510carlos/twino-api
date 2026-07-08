"use client"

import { useEffect, useRef, useState, type RefObject } from "react"
import { calculateTimeLeft, getCurrentTimeZone, getNextTimeZone } from "../Countdown/Countdown.helper"
import { cities } from "../Countdown/cities"
import { deriveLocation } from "./data"
import type { DigitRefs, LocationDetails } from "./types"

function getInitialLocation(): LocationDetails {
  const zone = getCurrentTimeZone()
  return deriveLocation(typeof zone === "string" && cities[zone as keyof typeof cities] ? zone : "america/los_angeles")
}

type CountdownLocation = {
  digitRefs: DigitRefs
  location: LocationDetails
  timerRef: RefObject<HTMLDivElement | null>
}

export function useCountdownLocation(): CountdownLocation {
  const [location, setLocation] = useState<LocationDetails>(getInitialLocation)
  const m1 = useRef<HTMLDivElement>(null)
  const m2 = useRef<HTMLDivElement>(null)
  const s1 = useRef<HTMLDivElement>(null)
  const s2 = useRef<HTMLDivElement>(null)
  const timerRef = useRef<HTMLDivElement>(null)
  const zoneRef = useRef<string>(getCurrentTimeZone())

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let lastSec = -1
    const roll = (el: HTMLDivElement | null, digit: number) => {
      if (el) el.style.transform = `translateY(-${digit * 10}%)`
    }
    const tick = () => {
      const { minutes, seconds } = calculateTimeLeft()
      const mStr = String(minutes).padStart(2, "0")
      const sStr = String(seconds).padStart(2, "0")

      roll(m1.current, Number(mStr[0] ?? 0))
      roll(m2.current, Number(mStr[1] ?? 0))
      roll(s1.current, Number(sStr[0] ?? 0))
      roll(s2.current, Number(sStr[1] ?? 0))

      if (seconds !== lastSec && !prefersReduced.matches && timerRef.current) {
        timerRef.current.classList.remove("tick-pulse")
        void timerRef.current.offsetWidth
        timerRef.current.classList.add("tick-pulse")
        lastSec = seconds
      }

      if (minutes === 0 && seconds === 0) {
        const next = getNextTimeZone(zoneRef.current)
        zoneRef.current = next
        setLocation(deriveLocation(next))
      }
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return {
    digitRefs: { m1, m2, s1, s2 },
    location,
    timerRef,
  }
}
