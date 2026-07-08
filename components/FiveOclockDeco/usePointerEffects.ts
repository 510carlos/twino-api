"use client"

import { useEffect } from "react"

export function usePointerEffects() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    const finePointer = window.matchMedia("(pointer: fine)")
    if (!finePointer.matches || prefersReduced.matches) return

    const cleanups: Array<() => void> = []
    let raf = 0
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

    return () => cleanups.forEach((fn) => fn())
  }, [])
}
