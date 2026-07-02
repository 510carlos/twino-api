"use client"

import { useEffect } from "react"

export function useParticles() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const particles = document.getElementById("particles")
    if (!particles || prefersReduced.matches) return

    particles.innerHTML = ""
    for (let i = 0; i < 15; i += 1) {
      const particle = document.createElement("div")
      const size = Math.random() * 3 + 1
      particle.className = "particle"
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.setProperty("--duration", `${Math.random() * 10 + 10}s`)
      particle.style.animationDelay = `${Math.random() * 10}s`
      particles.appendChild(particle)
    }
  }, [])
}
