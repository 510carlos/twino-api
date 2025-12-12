"use client";

import { Countdown } from "./Countdown";
import { Meteors } from "./Meteors";
import { SparklesCore } from "./sparkles";

export default function Preview() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Star background */}
      <div className="fixed inset-0 w-full h-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="w-full px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <a
              href="https://theweekendisneverover.com/"
              className="px-6 py-2 text-white/80 hover:text-white transition-all duration-300 rounded-full backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10"
            >
              Home
            </a>
            <a
              href="https://www.etsy.com/shop/WeekendIsNeverOver"
              className="px-6 py-2 text-white/80 hover:text-white transition-all duration-300 rounded-full backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10"
            >
              Shop
            </a>
          </div>
        </nav>

        {/* Logo */}
        <div className="w-full px-4 mt-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 p-6">
              {/* Gradient glow behind logo */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 blur-xl" />
              <img
                src="https://www.theweekendisneverover.com/twino.png"
                alt="The Weekend Is Never Over"
                className="relative w-full h-auto max-h-24 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Hero - Countdown */}
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="relative w-full max-w-4xl">
            {/* Glow effect behind card */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl blur-3xl opacity-30 scale-105" />

            {/* Main card */}
            <div className="relative rounded-3xl overflow-hidden backdrop-blur-md bg-gray-900/80 border border-white/10 px-8 py-16 md:py-24">
              {/* Top gradient line */}
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
              <div className="absolute top-0 left-1/3 right-1/3 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-sm" />

              {/* Countdown */}
              <Countdown />

              {/* Tagline */}
              <div className="mt-16 text-center">
                <p className="text-white/50 text-lg md:text-xl italic">
                  &ldquo;Good vibes alive, one drink at a time&rdquo;
                </p>
              </div>

              {/* Meteors */}
              <Meteors number={15} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full px-6 py-8">
          <div className="max-w-6xl mx-auto text-center space-y-4">
            <p className="text-white/40 text-sm max-w-xl mx-auto">
              Follow our journey through never-ending drink recipes from around the globe.
            </p>
            <a
              href="mailto:TheWeekendIsNeverOver@gmail.com"
              className="inline-block text-white/60 hover:text-white transition-colors duration-300 text-sm"
            >
              TheWeekendIsNeverOver@gmail.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
