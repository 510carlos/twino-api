"use client"

import { useEffect, useRef, useState } from "react"
import "./deco.css"
import { AboutSection } from "./AboutSection"
import { Atmosphere } from "./Atmosphere"
import { deriveLocation } from "./data"
import { Footer } from "./Footer"
import { GameNightSection } from "./GameNightSection"
import { Header } from "./Header"
import { HeroSection } from "./HeroSection"
import type { LocationDetails } from "./types"
import { calculateTimeLeft, getCurrentTimeZone, getNextTimeZone } from "../Countdown/Countdown.helper"
import { cities } from "../Countdown/cities"

function getInitialLocation(): LocationDetails {
  const zone = getCurrentTimeZone()
  return deriveLocation(typeof zone === "string" && cities[zone as keyof typeof cities] ? zone : "america/los_angeles")
}

export function FiveOclockDeco() {
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

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const finePointer = window.matchMedia("(pointer: fine)")
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

    let raf = 0
    if (finePointer.matches && !prefersReduced.matches) {
      let mx = 0
      let my = 0
      let cx = 0
      let cy = 0
      const sunburst = document.querySelector<HTMLElement>(".bg-sunburst-parallax")
      const fans = Array.from(document.querySelectorAll<HTMLElement>(".fan"))
      const panels = Array.from(document.querySelectorAll<HTMLElement>(".hero .deco-panel"))
      const onMove = (event: MouseEvent) => {
        mx = (event.clientX / window.innerWidth - 0.5) * 2
        my = (event.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener("mousemove", onMove)
      cleanups.push(() => window.removeEventListener("mousemove", onMove))

      const render = () => {
        cx += (mx - cx) * 0.05
        cy += (my - cy) * 0.05
        if (sunburst) sunburst.style.transform = `translate(${cx * -15}px, ${cy * -15}px)`
        fans.forEach((fan) => {
          const isLeft = fan.classList.contains("fan-left")
          const dir = isLeft ? -1 : 1
          fan.style.transform = `translate(${cx * 10 * dir}px, ${cy * 10}px) ${isLeft ? "" : "scaleX(-1)"}`
        })
        panels.forEach((panel) => {
          panel.style.transform = `perspective(1000px) rotateX(${cy * -1.5}deg) rotateY(${cx * 1.5}deg) translateZ(5px)`
        })
        raf = requestAnimationFrame(render)
      }
      render()
      cleanups.push(() => cancelAnimationFrame(raf))

      const cards = Array.from(document.querySelectorAll<HTMLElement>(".game-card"))
      cards.forEach((card) => {
        let rect: DOMRect | null = null
        const enter = () => {
          rect = card.getBoundingClientRect()
          card.style.transition = "transform 0.1s ease-out, box-shadow 0.4s ease"
        }
        const move = (event: MouseEvent) => {
          if (!rect) return
          const rx = ((event.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -6
          const ry = ((event.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 6
          card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-10px) scale(1.02)`
        }
        const leave = () => {
          rect = null
          card.style.transition = "transform 0.5s var(--ease-premium), box-shadow 0.5s ease"
          card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)"
        }
        card.addEventListener("mouseenter", enter)
        card.addEventListener("mousemove", move)
        card.addEventListener("mouseleave", leave)
        cleanups.push(() => {
          card.removeEventListener("mouseenter", enter)
          card.removeEventListener("mousemove", move)
          card.removeEventListener("mouseleave", leave)
        })
      })
    }

    const particles = document.getElementById("particles")
    if (particles && !prefersReduced.matches) {
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
    }

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <div className="deco-root">
      <Atmosphere />
      <div className="container">
        <Header />
        <main>
          <HeroSection location={location} digitRefs={{ m1, m2, s1, s2 }} timerRef={timerRef} />
          <GameNightSection />
          <AboutSection />
        </main>
      </div>
      <Footer />
    </div>
  )
}
