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

        {/* ============================================ */}
        {/* MOBILE HEADER (< md) */}
        {/* ============================================ */}
        <div className="md:hidden">
          {/* Centered pill nav */}
          <nav className="w-full px-4 pt-4 pb-2">
            <div className="flex justify-center">
              <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/5 border border-white/10 p-1">
                <a
                  href="https://theweekendisneverover.com/"
                  className="px-5 py-1.5 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                >
                  Home
                </a>
                <div className="w-px h-4 bg-white/20" />
                <a
                  href="https://www.etsy.com/shop/WeekendIsNeverOver"
                  className="px-5 py-1.5 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                >
                  Shop
                </a>
              </div>
            </div>
          </nav>

          {/* Logo below nav */}
          <div className="w-full px-4 pt-2 pb-4">
            <div className="max-w-sm mx-auto">
              <div className="relative rounded-xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 p-3">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 blur-xl" />
                <img
                  src="https://www.theweekendisneverover.com/twino.png"
                  alt="The Weekend Is Never Over"
                  className="relative w-full h-auto max-h-14 object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* TABLET+ HEADER (>= md) */}
        {/* ============================================ */}
        <header className="hidden md:block w-full px-4 lg:px-6 py-4 lg:py-6">
          <div className="max-w-5xl lg:max-w-6xl 2xl:max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              {/* Home link */}
              <a
                href="https://theweekendisneverover.com/"
                className="px-5 lg:px-6 py-2 text-sm lg:text-base text-white/80 hover:text-white transition-all duration-300 rounded-full backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10"
              >
                Home
              </a>

              {/* Centered logo */}
              <div className="flex-1 flex justify-center px-4">
                <div className="relative rounded-xl lg:rounded-2xl overflow-hidden backdrop-blur-sm bg-white/5 border border-white/10 px-4 lg:px-6 py-2 lg:py-3 max-w-md lg:max-w-lg 2xl:max-w-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 blur-xl" />
                  <img
                    src="https://www.theweekendisneverover.com/twino.png"
                    alt="The Weekend Is Never Over"
                    className="relative w-full h-auto max-h-12 lg:max-h-16 2xl:max-h-20 object-contain"
                  />
                </div>
              </div>

              {/* Shop link */}
              <a
                href="https://www.etsy.com/shop/WeekendIsNeverOver"
                className="px-5 lg:px-6 py-2 text-sm lg:text-base text-white/80 hover:text-white transition-all duration-300 rounded-full backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10"
              >
                Shop
              </a>
            </div>
          </div>
        </header>

        {/* ============================================ */}
        {/* HERO - COUNTDOWN (all sizes) */}
        {/* ============================================ */}
        <div className="flex-1 flex items-start md:items-center justify-center px-3 sm:px-4 py-2 sm:py-4 md:py-12 lg:py-16">
          <div className="relative w-full max-w-none sm:max-w-xl md:max-w-2xl lg:max-w-3xl 2xl:max-w-4xl">
            {/* Glow effect behind card */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl opacity-30 scale-105" />

            {/* Main card */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-md bg-gray-900/80 border border-white/10 px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-14 md:py-16 lg:py-20 2xl:py-24">
              {/* Top gradient line */}
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
              <div className="absolute top-0 left-1/3 right-1/3 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-sm" />

              {/* Countdown */}
              <Countdown />

              {/* Tagline */}
              <div className="mt-6 sm:mt-8 md:mt-12 lg:mt-16 text-center">
                <p className="text-white/50 text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl italic px-2">
                  &ldquo;Good vibes alive, one drink at a time&rdquo;
                </p>
              </div>

              {/* Meteors */}
              <Meteors number={15} />
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* ABOUT CARD */}
        {/* ============================================ */}
        <div className="px-3 sm:px-4 pb-6 sm:pb-8 md:pb-12">
          <div className="relative w-full max-w-none sm:max-w-xl md:max-w-2xl lg:max-w-3xl 2xl:max-w-4xl mx-auto">
            {/* Glow effect behind card */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-2xl sm:rounded-3xl blur-2xl sm:blur-3xl opacity-20 scale-105" />

            {/* About card */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-md bg-gray-900/80 border border-white/10 px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12">
              {/* Top gradient line */}
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
              <div className="absolute top-0 left-1/3 right-1/3 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent blur-sm" />

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
                It is 5 o&apos;clock somewhere!
              </h2>

              <div className="space-y-4 text-white/60 text-sm sm:text-base md:text-lg leading-relaxed">
                <p>
                  The weekend is never over is a lifestyle committed to keeping good vibes alive one drink at a time. We are an online destination sharing drink and beverage recipes from all over the world.
                </p>
                <p>
                  Our home page is a countdown clock to happy hour. Every hour counting down the minutes and seconds left to the next time it is 5 o&apos;clock somewhere around the globe.
                </p>
                <p>
                  Our online Etsy store sells streetwear clothing with our brand name. The idea for our logo was inspired by the American Sign Language (ASL) fingerspelling sign for the letter &ldquo;W&rdquo;, the first letter in the word Weekend.
                </p>
                <p>
                  Follow our journey through never-ending drink recipes from all around the globe. Whether you are working for the weekend or working on the weekend, the weekend is never over when you can take a moment to enjoy a refreshing drink.
                </p>
              </div>

              {/* Contact */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
                <p className="text-white/40 text-xs sm:text-sm mb-2">Contact Us</p>
                <a
                  href="mailto:TheWeekendIsNeverOver@gmail.com"
                  className="text-white/80 hover:text-white transition-colors text-sm sm:text-base"
                >
                  TheWeekendIsNeverOver@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* FOOTER (all sizes) */}
        {/* ============================================ */}
        <footer className="w-full px-4 py-4 sm:py-6 md:py-8">
          <div className="text-center">
            <p className="text-white/30 text-[10px] sm:text-xs">
              &copy; {new Date().getFullYear()} The Weekend Is Never Over
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
