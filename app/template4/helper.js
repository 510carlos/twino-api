'use client';

import { useEffect, useState } from "react"

export const useCountdown = (initialTime) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)
    const [showConfetti, setShowConfetti] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1)
            } else {
                setShowConfetti(true)
                setTimeout(() => {
                    setShowConfetti(false)
                    setTimeLeft(initialTime) // Restart the timer
                }, 5000) // Show confetti for 5 seconds before restarting
            }
        }, 1000)

        return () => clearTimeout(timer)
    }, [timeLeft, initialTime])

    return { timeLeft, showConfetti }
}