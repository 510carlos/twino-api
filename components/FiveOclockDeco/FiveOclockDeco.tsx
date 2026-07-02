"use client"

import "./deco.css"
import { AboutSection } from "./AboutSection"
import { Atmosphere } from "./Atmosphere"
import { Footer } from "./Footer"
import { GameNightSection } from "./GameNightSection"
import { Header } from "./Header"
import { HeroSection } from "./HeroSection"
import { useCountdownLocation } from "./useCountdownLocation"
import { useDecoMotion } from "./useDecoMotion"
import { useParticles } from "./useParticles"
import { usePointerEffects } from "./usePointerEffects"

export function FiveOclockDeco() {
  const { digitRefs, location, timerRef } = useCountdownLocation()
  useDecoMotion()
  usePointerEffects()
  useParticles()

  return (
    <div className="deco-root">
      <Atmosphere />
      <div className="container">
        <Header />
        <main>
          <HeroSection location={location} digitRefs={digitRefs} timerRef={timerRef} />
          <GameNightSection />
          <AboutSection />
        </main>
      </div>
      <Footer />
    </div>
  )
}
