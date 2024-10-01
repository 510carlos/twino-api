'use client';

import { useEffect, useState } from "react"

export const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const calculateTimeToNextHour = () => {
      const now = new Date()
      const nextHour = new Date(now)
      nextHour.setHours(nextHour.getHours() + 1)
      nextHour.setMinutes(0)
      nextHour.setSeconds(0)
      nextHour.setMilliseconds(0)
      return Math.floor((nextHour - now) / 1000)
    }

    const updateTimer = () => {
      const secondsLeft = calculateTimeToNextHour()
      setTimeLeft(secondsLeft)

      if (secondsLeft === 0) {
        setShowConfetti(true)
        setTimeout(() => {
          setShowConfetti(false)
        }, 5000) // Show confetti for 5 seconds
      }
    }

    updateTimer() // Initial update
    const timer = setInterval(updateTimer, 1000)

    return () => clearInterval(timer)
  }, [])

  return { timeLeft, showConfetti }
}