"use client"

import { useEffect } from "react"

export function useDecoMotion() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const cleanups: Array<() => void> = []

    const obs = new IntersectionObserver(
      (entries, observer) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    )
    document.querySelectorAll(".reveal-item").forEach((el) => obs.observe(el))
    cleanups.push(() => obs.disconnect())

    const revealStack = document.getElementById("reveal-stack")
    const stackItems = Array.from(document.querySelectorAll<HTMLElement>(".stack-item"))
    const updateScrollReveal = () => {
      if (!revealStack) return
      if (prefersReduced.matches) {
        revealStack.style.setProperty("--scroll-progress", "1")
        stackItems.forEach((item) => item.classList.add("is-active"))
        return
      }

      const rect = revealStack.getBoundingClientRect()
      const startY = window.innerHeight * 0.75
      const endY = window.innerHeight * 0.25
      const total = startY - endY + rect.height
      const progress = Math.max(0, Math.min(1, (startY - rect.top) / total))
      revealStack.style.setProperty("--scroll-progress", String(progress))

      const lineBottomY = rect.top + 20 + progress * (rect.height - 40)
      stackItems.forEach((item) => {
        const circle = item.querySelector(".step-number")
        if (!circle) return
        const circleRect = circle.getBoundingClientRect()
        if (lineBottomY >= circleRect.top + circleRect.height / 2 - 10) item.classList.add("is-active")
        else item.classList.remove("is-active")
      })
    }
    window.addEventListener("scroll", updateScrollReveal, { passive: true })
    updateScrollReveal()
    cleanups.push(() => window.removeEventListener("scroll", updateScrollReveal))

    const parallaxBg = document.getElementById("parallax-bg")
    const onScrollBg = () => {
      if (prefersReduced.matches || !parallaxBg) return
      parallaxBg.style.transform = `translateY(${window.scrollY * 0.15}px)`
    }
    window.addEventListener("scroll", onScrollBg, { passive: true })
    cleanups.push(() => window.removeEventListener("scroll", onScrollBg))

    return () => cleanups.forEach((fn) => fn())
  }, [])
}
