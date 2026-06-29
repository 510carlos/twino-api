"use client"

import { useEffect, useRef, useState, type RefObject } from "react"
import "./deco.css"
import drinksData from "./drinks.json"
import flagData from "./country-flags.json"
import { calculateTimeLeft, getCurrentTimeZone, getNextTimeZone } from "../Countdown/Countdown.helper"
import { cities } from "../Countdown/cities"

const GAMES_URL = "https://games.theweekendisneverover.com"
const drinks = drinksData as unknown as Record<string, { slug: string; recipe: string }>
const flags = flagData as Record<string, string>

type Loc = {
  city: string // full "City, Country"
  country: string
  drink: string
  recipe: string
  image: string
  iso: string
}

function deriveLocation(zone: string): Loc {
  const entry = (cities as Record<string, { city: string; drink: string }[]>)[zone]?.[0]
  const fallback = { city: "Havana, Cuba", drink: "Daiquiri" }
  const { city, drink } = entry || fallback
  const commaIdx = city.indexOf(", ")
  const country = commaIdx >= 0 ? city.slice(commaIdx + 2) : ""
  const d = drinks[drink] || { slug: "rum", recipe: "" }
  return {
    city,
    country,
    drink,
    recipe: d.recipe,
    image: `/drinks/${d.slug}.webp`,
    iso: flags[country] || "xx",
  }
}

export function FiveOclockDeco() {
  const [loc, setLoc] = useState<Loc>(() => {
    const z = getCurrentTimeZone()
    return deriveLocation(typeof z === "string" && cities[z as keyof typeof cities] ? z : "america/los_angeles")
  })

  const m1 = useRef<HTMLDivElement>(null)
  const m2 = useRef<HTMLDivElement>(null)
  const s1 = useRef<HTMLDivElement>(null)
  const s2 = useRef<HTMLDivElement>(null)
  const timerRef = useRef<HTMLDivElement>(null)
  const zoneRef = useRef<string>(getCurrentTimeZone())

  // --- Countdown engine (unchanged logic) + odometer ---
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
      roll(m1.current, +mStr[0]); roll(m2.current, +mStr[1])
      roll(s1.current, +sStr[0]); roll(s2.current, +sStr[1])
      if (seconds !== lastSec && !prefersReduced.matches && timerRef.current) {
        timerRef.current.classList.remove("tick-pulse")
        void timerRef.current.offsetWidth
        timerRef.current.classList.add("tick-pulse")
        lastSec = seconds
      }
      if (minutes === 0 && seconds === 0) {
        const next = getNextTimeZone(zoneRef.current)
        zoneRef.current = next
        setLoc(deriveLocation(next))
      }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  // --- Motion: reveals, scroll-linked 1-2-3, parallax, tilt, particles (faithful port) ---
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const finePointer = window.matchMedia("(pointer: fine)")
    const cleanups: Array<() => void> = []

    // Reveal on scroll
    const obs = new IntersectionObserver(
      (entries, o) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); o.unobserve(e.target) } }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    )
    document.querySelectorAll(".reveal-item").forEach((el) => obs.observe(el))
    cleanups.push(() => obs.disconnect())

    // Scroll-linked 1-2-3
    const revealStack = document.getElementById("reveal-stack")
    const stackItems = Array.from(document.querySelectorAll<HTMLElement>(".stack-item"))
    const updateScrollReveal = () => {
      if (!revealStack) return
      if (prefersReduced.matches) {
        revealStack.style.setProperty("--scroll-progress", "1")
        stackItems.forEach((i) => i.classList.add("is-active"))
        return
      }
      const rect = revealStack.getBoundingClientRect()
      const wH = window.innerHeight
      const startY = wH * 0.75, endY = wH * 0.25
      const total = startY - endY + rect.height
      let progress = (startY - rect.top) / total
      progress = Math.max(0, Math.min(1, progress))
      revealStack.style.setProperty("--scroll-progress", String(progress))
      const lineBottomY = rect.top + 20 + progress * (rect.height - 40)
      stackItems.forEach((item) => {
        const circle = item.querySelector(".step-number")
        if (!circle) return
        const cr = circle.getBoundingClientRect()
        if (lineBottomY >= cr.top + cr.height / 2 - 10) item.classList.add("is-active")
        else item.classList.remove("is-active")
      })
    }
    window.addEventListener("scroll", updateScrollReveal, { passive: true })
    updateScrollReveal()
    cleanups.push(() => window.removeEventListener("scroll", updateScrollReveal))

    // Background parallax on scroll
    const parallaxBg = document.getElementById("parallax-bg")
    const onScrollBg = () => {
      if (prefersReduced.matches || !parallaxBg) return
      parallaxBg.style.transform = `translateY(${window.scrollY * 0.15}px)`
    }
    window.addEventListener("scroll", onScrollBg, { passive: true })
    cleanups.push(() => window.removeEventListener("scroll", onScrollBg))

    // Pointer parallax + card tilt (desktop only)
    let raf = 0
    if (finePointer.matches && !prefersReduced.matches) {
      let mx = 0, my = 0, cx = 0, cy = 0
      const sunburst = document.querySelector<HTMLElement>(".bg-sunburst-parallax")
      const fans = Array.from(document.querySelectorAll<HTMLElement>(".fan"))
      const panels = Array.from(document.querySelectorAll<HTMLElement>(".hero .deco-panel"))
      const onMove = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2
        my = (e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener("mousemove", onMove)
      cleanups.push(() => window.removeEventListener("mousemove", onMove))
      const render = () => {
        cx += (mx - cx) * 0.05; cy += (my - cy) * 0.05
        if (sunburst) sunburst.style.transform = `translate(${cx * -15}px, ${cy * -15}px)`
        fans.forEach((fan) => {
          const isLeft = fan.classList.contains("fan-left")
          const dir = isLeft ? -1 : 1
          fan.style.transform = `translate(${cx * 10 * dir}px, ${cy * 10}px) ${isLeft ? "" : "scaleX(-1)"}`
        })
        panels.forEach((p) => { p.style.transform = `perspective(1000px) rotateX(${cy * -1.5}deg) rotateY(${cx * 1.5}deg) translateZ(5px)` })
        raf = requestAnimationFrame(render)
      }
      render()
      cleanups.push(() => cancelAnimationFrame(raf))

      const cards = Array.from(document.querySelectorAll<HTMLElement>(".game-card"))
      cards.forEach((card) => {
        let rect: DOMRect | null = null
        const enter = () => { rect = card.getBoundingClientRect(); card.style.transition = "transform 0.1s ease-out, box-shadow 0.4s ease" }
        const move = (e: MouseEvent) => {
          if (!rect) return
          const rx = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -6
          const ry = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 6
          card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-10px) scale(1.02)`
        }
        const leave = () => { rect = null; card.style.transition = "transform 0.5s var(--ease-premium), box-shadow 0.5s ease"; card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)" }
        card.addEventListener("mouseenter", enter); card.addEventListener("mousemove", move); card.addEventListener("mouseleave", leave)
        cleanups.push(() => { card.removeEventListener("mouseenter", enter); card.removeEventListener("mousemove", move); card.removeEventListener("mouseleave", leave) })
      })
    }

    // Ambient particles
    const pc = document.getElementById("particles")
    if (pc && !prefersReduced.matches) {
      pc.innerHTML = ""
      for (let i = 0; i < 15; i++) {
        const p = document.createElement("div")
        p.className = "particle"
        const size = Math.random() * 3 + 1
        p.style.left = Math.random() * 100 + "%"
        p.style.top = Math.random() * 100 + "%"
        p.style.width = size + "px"; p.style.height = size + "px"
        p.style.setProperty("--duration", Math.random() * 10 + 10 + "s")
        p.style.animationDelay = Math.random() * 10 + "s"
        pc.appendChild(p)
      }
    }

    return () => cleanups.forEach((fn) => fn())
  }, [])

  const digitCol = (ref: RefObject<HTMLDivElement>) => (
    <div className="digit-window">
      <div className="digit-col" ref={ref}>
        {Array.from({ length: 10 }, (_, n) => (<div className="digit-num" key={n}>{n}</div>))}
      </div>
    </div>
  )

  return (
    <div className="deco-root">
      <div className="film-grain" />
      <div className="vignette" />
      <div className="bg-sunburst-container" id="parallax-bg">
        <div className="bg-sunburst-parallax" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          <div className="bg-sunburst" aria-hidden="true" />
        </div>
      </div>
      <div className="bg-texture" aria-hidden="true" />

      <div className="side-fans" aria-hidden="true">
        {["fan-left", "fan-right"].map((cls) => (
          <svg key={cls} className={`fan ${cls}`} viewBox="0 0 100 1000" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <g stroke="var(--gold-deep)" strokeWidth="1" fill="none" opacity="0.4">
              {[10, 30, 50, 70, 90].map((x) => (<line key={x} x1={x} y1="0" x2={x} y2="1000" />))}
              {[100, 300, 500, 700, 900].map((y) => (<path key={y} d={`M0,${y} L50,${y + 50} L100,${y}`} />))}
            </g>
          </svg>
        ))}
      </div>

      <div className="container">
        <header>
          <div className="header-content reveal-item">
            <a href="#" className="nav-link">Home</a>
            <h1 className="logo-area">
              <span className="logo-top text-cream">THE WEEKEND</span>
              <span className="logo-bottom metallic-text">IS NEVER OVER</span>
            </h1>
            <a href={GAMES_URL} className="nav-link">Shop</a>
          </div>
        </header>

        <main>
          <section className="hero">
            <div className="particles-container" id="particles" aria-hidden="true" />
            <p className="tagline reveal-item">It is 5 o&apos;clock somewhere.<br />Curated drinks &amp; timeless games for the sophisticated reveler.</p>

            <div className="reveal-stack reveal-item" id="reveal-stack">
              <div className="stack-item reveal-item">
                <div className="step-number">1</div>
                <div className="deco-panel panel-countdown">
                  <div className="panel-label">COUNTDOWN</div>
                  <div className="countdown-time solid-gold-text" id="timer" ref={timerRef} aria-live="polite">
                    {digitCol(m1)}{digitCol(m2)}<span className="colon">:</span>{digitCol(s1)}{digitCol(s2)}
                  </div>
                  <div className="countdown-divider" />
                  <div className="countdown-caption">until 5 o&apos;clock in {loc.city.split(",")[0]}</div>
                </div>
              </div>

              <div className="stack-item reveal-item">
                <div className="step-number">2</div>
                <div className="deco-panel panel-location">
                  <div className="panel-label">LOCATION</div>
                  <div className="pin-icon" aria-hidden="true">
                    <svg className="pin-shape" viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
                      <path d="M50,130 C50,130 0,80 0,50 C0,22.4 22.4,0 50,0 C77.6,0 100,22.4 100,50 C100,80 50,130 50,130 Z" fill="var(--green-darkest)" stroke="var(--gold)" strokeWidth="4" />
                    </svg>
                    <img className="pin-flag" src={`/flags/${loc.iso}.svg`} alt="" />
                  </div>
                  <div className="location-text metallic-text">{loc.city.toUpperCase()}</div>
                </div>
              </div>

              <div className="stack-item reveal-item">
                <div className="step-number">3</div>
                <div className="deco-panel panel-drink">
                  <div className="panel-label">LOCAL DRINK OF CHOICE</div>
                  <div className="drink-info">
                    <div className="drink-subtitle">Now pouring:</div>
                    <div className="drink-title metallic-text">{loc.drink.toUpperCase()}</div>
                    <p className="drink-recipe">{loc.recipe}</p>
                  </div>
                  <div className="drink-image-wrapper">
                    <img src={loc.image} alt={loc.drink} />
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-item">
              <a href={GAMES_URL} className="btn btn-primary">Explore {loc.city.split(",")[0]}&apos;s 5 o&apos;clock</a>
              <svg className="scroll-cue" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ display: "block" }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </section>

          <section className="game-night">
            <div className="section-divider reveal-item"><h2 className="metallic-text">GAME NIGHT</h2></div>
            <p className="game-subtitle reveal-item">Gather your friends. Game on.</p>
            <div className="cards-grid">
              {[
                { img: "card-crazy-eights", title: "Crazy Eights", path: "/crazy-eights", desc: "A fast-paced classic of matching suits and numbers." },
                { img: "card-translation", title: "Translation Cards", path: "/translation-cards", desc: "Learn the local lingo while you sip your cocktail." },
                { img: "card-loteria", title: "Lotería", path: "/loteria", desc: "A game of chance, beautiful imagery, and quick wits." },
              ].map((g) => {
                const gameUrl = `${GAMES_URL}${g.path}`
                return (
                  <div className="deco-panel game-card reveal-item" key={g.img}>
                    <a href={gameUrl} className="card-img-container" aria-label={g.title}><img src={`/games/${g.img}.webp`} alt={g.title} /></a>
                    <h3><a href={gameUrl} className="game-title-link">{g.title}</a></h3>
                    <p>{g.desc}</p>
                    <a href={gameUrl} className="btn">Play</a>
                  </div>
                )
              })}
            </div>
            <p className="no-account-note reveal-item">No account needed — play in seconds.</p>
          </section>

          <section className="about reveal-item">
            <h2 className="metallic-text">ABOUT</h2>
            <p>The Weekend Is Never Over is a lifestyle committed to keeping good vibes alive one drink at a time — an online destination sharing drink and beverage recipes from all over the world. Whether you are working for the weekend or working on the weekend, the weekend is never over when you can take a moment to enjoy a refreshing drink.</p>
          </section>
        </main>
      </div>

      <footer className="reveal-item">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">THE WEEKEND<br />IS NEVER OVER</div>
              <div className="copyright">&copy; 2026 All Rights Reserved.</div>
            </div>
            <div className="footer-socials">
              {["Instagram", "Facebook", "X", "Pinterest"].map((s) => (
                <a href="#" aria-label={s} key={s}>
                  <svg className="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" /></svg>
                </a>
              ))}
            </div>
            <div className="footer-newsletter">
              <span className="newsletter-text">Newsletter for exclusive offers and updates.</span>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Enter your email" required aria-label="Email address" />
                <button type="submit">Subscribe</button>
              </form>
              <div className="footer-links">
                <a href="#">Terms &amp; Conditions</a> | <a href="#">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
