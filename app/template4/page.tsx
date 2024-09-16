'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Coffee, MapPin } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import './global.css'

// Custom Hook for Countdown Timer Logic
function useCountdown(initialTime) {
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

// Progress Bar Component
const ProgressBar = ({ timeLeft }) => (
    <div className="w-full h-2 bg-[#1a1a1a] relative overflow-hidden">
        <motion.div
            className="absolute inset-y-0"
            style={{
                left: '50%',
                right: '50%',
                background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
                boxShadow: '0 0 10px #00ffff, 0 0 20px #ff00ff',
                animation: 'progress-glow 2s linear infinite',
            }}
            animate={{
                left: `${50 - (timeLeft / 60) * 50}%`,
                right: `${50 - (timeLeft / 60) * 50}%`,
            }}
            transition={{ duration: 0.5, ease: 'linear' }}
        />
        <motion.div
            className="absolute top-0 left-0 h-full w-full"
            style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                backgroundSize: '200% 100%',
            }}
            animate={{
                backgroundPosition: ['100% 0%', '-100% 0%'],
            }}
            transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: 'linear',
            }}
        />
    </div>
);

// Header Component
const Header = () => (
    <header className="bg-transparent p-4">
        <div className="container mx-auto flex justify-center items-center">
            <nav className="flex space-x-8">
                <Link href="/" className="text-[#00ffff] hover:text-[#ff00ff] transition-colors duration-300">Home</Link>
                <Link href="/recipes" className="text-[#00ffff] hover:text-[#ff00ff] transition-colors duration-300">Recipes</Link>
                <Link href="/about" className="text-[#00ffff] hover:text-[#ff00ff] transition-colors duration-300">About Us</Link>
                <Link href="/shop" className="text-[#00ffff] hover:text-[#ff00ff] transition-colors duration-300">Shop</Link>
            </nav>
        </div>
    </header>
);

// Brand Component
const Brand = () => (
    <div className="text-center mb-8">
        <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-center text-[#00ffff]"
            style={{ animation: 'neon-pulse 1.5s ease-in-out infinite alternate' }}
        >
            The Weekend Is Never Over
        </motion.h1>
        <motion.h2
            className="text-2xl md:text-3xl font-semibold text-center text-[#ff00ff]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            It&apos;s 5:00 O&apos;clock Somewhere
        </motion.h2>
    </div>
);

// Countdown Timer Component
const CountdownTimer = ({ timeLeft, setIsHovering, isHovering }) => {
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <motion.div
            className="p-8 rounded-3xl bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] mx-auto mt-8 mb-12"
            style={{
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                maxWidth: '600px',
                animation: 'laser-border 3s linear infinite',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
                opacity: 1,
                scale: [1, 1.02, 1],
                transition: {
                    scale: {
                        repeat: Infinity,
                        duration: 2,
                    },
                },
            }}
        >
            <motion.div
                className="text-7xl md:text-9xl font-bold text-center text-[#00ffff]"
                style={{
                    minHeight: '160px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textShadow: '0 0 10px #00ffff',
                }}
                onMouseEnter={() => setIsHovering('timer')}
                onMouseLeave={() => setIsHovering('')}
                animate={{
                    scale: isHovering === 'timer' ? 1.1 : 1,
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.span
                        key={timeLeft}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`inline-block ${timeLeft <= 10 ? 'text-[#ff00ff]' : ''}`}
                    >
                        {formatTime(timeLeft)}
                    </motion.span>
                </AnimatePresence>
            </motion.div>

            <motion.div
                className="mt-8 flex justify-center space-x-8 text-[#00ffff]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <motion.div
                    className="flex items-center"
                    onMouseEnter={() => setIsHovering('location')}
                    onMouseLeave={() => setIsHovering('')}
                    animate={{
                        scale: isHovering === 'location' ? 1.1 : 1,
                    }}
                >
                    <MapPin className="mr-2" />
                    <span>New York, USA</span>
                </motion.div>
                <motion.div
                    className="flex items-center"
                    onMouseEnter={() => setIsHovering('drink')}
                    onMouseLeave={() => setIsHovering('')}
                    animate={{
                        scale: isHovering === 'drink' ? 1.1 : 1,
                    }}
                >
                    <Coffee className="mr-2" />
                    <span>Margarita</span>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

// Recipe Component
const RecipeComponent = () => (
    <motion.div
        className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-8 rounded-3xl max-w-2xl mx-auto shadow-lg mt-12 mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className="text-4xl font-bold mb-6 text-center text-[#00ffff] animate-pulse">Margarita Recipe</h2>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <h3 className="text-2xl font-semibold mb-4 text-[#ff00ff]">Ingredients</h3>
                <ul className="list-disc list-inside text-[#e0e0e0] space-y-2">
                    <li>2 oz tequila</li>
                    <li>1 oz lime juice</li>
                    <li>1 oz Cointreau or Triple Sec</li>
                    <li>Salt for rimming</li>
                    <li>Lime wedge for garnish</li>
                    <li>Ice</li>
                </ul>
            </div>
            <div className="space-y-4">
                <h3 className="text-2xl font-semibold mb-4 text-[#ff00ff]">Instructions</h3>
                <ol className="list-decimal list-inside text-[#e0e0e0] space-y-2">
                    <li>Rim a glass with salt</li>
                    <li>Fill a shaker with ice</li>
                    <li>Add tequila, lime juice, and Cointreau</li>
                    <li>Shake well for about 10 seconds</li>
                    <li>Strain into the prepared glass over ice</li>
                    <li>Garnish with a lime wedge</li>
                    <li>Enjoy responsibly!</li>
                </ol>
            </div>
        </div>
    </motion.div>
);

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
