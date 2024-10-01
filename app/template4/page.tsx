'use client'

import { motion } from 'framer-motion'
import React, { useState } from 'react'
import Confetti from 'react-confetti'
import './global.css'
import { Brand } from './components/Brand'
import { CountdownTimer } from './components/CountdownTimer'
import { Header } from './components/Header'
import { ProgressBar } from './components/ProgressBar'
import { RecipeComponent } from './components/RecipeComponent'

import { useCountdown } from './helper'


// Main Application Component
export default function MergedTemplate() {
    const { timeLeft, showConfetti } = useCountdown(60);
    const [isHovering, setIsHovering] = useState('')

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0]">
            {showConfetti && <Confetti colors={['#00ffff', '#ff00ff', '#ffff00']} />}

            <ProgressBar timeLeft={timeLeft} />
            <Header />

            {/* Main Content */}
            <main className="pt-6 space-y-20">
                {/* Countdown Timer Section */}
                <section className="flex flex-col items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-4xl mx-auto"
                    >
                        <Brand />
                        <CountdownTimer timeLeft={timeLeft} setIsHovering={setIsHovering} isHovering={isHovering} />
                    </motion.div>
                </section>

                {/* YouTube Video Section */}
                <section className="flex flex-col items-center justify-center px-4">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/oGnUaSmisu8?si=eXhqxg04YEq5qUwz"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        className="w-full max-w-xl mx-auto mb-8"
                    ></iframe>
                </section>

                {/* Recipe Section */}
                <section className="flex flex-col items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-4xl mx-auto"
                    >
                        <RecipeComponent />
                    </motion.div>
                </section>
            </main>
        </div>
    )
}
