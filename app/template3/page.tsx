'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Clock, Coffee, MapPin, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Confetti from 'react-confetti'

const CountdownTimer = ({ timeLeft, setIsHovering, isHovering }) => {
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    return (
        <motion.div
            className="p-8 rounded-3xl bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]"
            style={{
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                minWidth: '400px',
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
                    minWidth: '400px',
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

const RecipeComponent = () => {
    return (
        <motion.div
            className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-8 rounded-3xl max-w-2xl mx-auto shadow-lg"
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
    )
}

const ImageComponent = () => {
    return (
        <motion.div
            className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-3xl shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-4xl font-bold mb-6 text-center text-[#00ffff] animate-pulse">Margarita Perfection</h2>
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Margarita cocktail"
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110"
                />
            </div>
            <p className="mt-4 text-center text-[#e0e0e0]">Indulge in the perfect blend of tequila, lime, and triple sec.</p>
        </motion.div>
    )
}

export default function Component() {
    const [timeLeft, setTimeLeft] = useState(60) // 1 minute in seconds
    const [isHovering, setIsHovering] = useState('')
    const [showConfetti, setShowConfetti] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)
    const slidesRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1)
            } else {
                setShowConfetti(true)
                setTimeout(() => {
                    setShowConfetti(false)
                    setTimeLeft(60) // Restart the timer
                }, 5000) // Show confetti for 5 seconds before restarting
            }
        }, 1000)

        return () => clearTimeout(timer)
    }, [timeLeft])

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2
            let newSlide = 0

            slidesRef.current.forEach((slide, index) => {
                if (slide && scrollPosition >= slide.offsetTop) {
                    newSlide = index
                }
            })

            setCurrentSlide(newSlide)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const slides = [
        { component: <CountdownTimer timeLeft={timeLeft} setIsHovering={setIsHovering} isHovering={isHovering} />, title: "The Weekend's Never Over" },
        { component: <RecipeComponent />, title: "Margarita Recipe" },
        { component: <ImageComponent />, title: "Margarita Perfection" }
    ]

    return (
        <div className="min-h-screen bg-[#050505] text-[#e0e0e0]">
            {showConfetti && <Confetti colors={['#00ffff', '#ff00ff', '#ffff00']} />}
            <style jsx global>{`
        @keyframes neon-pulse {
          0% { text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 20px #00ffff; }
          100% { text-shadow: 0 0 2px #00ffff, 0 0 5px #00ffff, 0 0 10px #00ffff; }
        }
        @keyframes laser-border {
          0% { box-shadow: 0 0 0 2px #00ffff, 0 0 0 4px #050505, 0 0 20px #00ffff; }
          50% { box-shadow: 0 0 0 2px #ff00ff, 0 0 0 4px #050505, 0 0 20px #ff00ff; }
          100% { box-shadow: 0 0 0 2px #00ffff, 0 0 0 4px #050505, 0 0 20px #00ffff; }
        }
        @keyframes progress-glow {
          0% { box-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff; }
          50% { box-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff; }
          100% { box-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff; }
        }
      `}</style>

            {/* Fixed Header */}
            <div className="fixed top-0 inset-x-0 z-50">
                {/* Progress Bar */}
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

                {/* Navigation Bar */}
                <nav className="bg-[#0a0a0a] p-4 relative">
                    <div className="container mx-auto flex justify-center items-center">
                        <div className="hidden md:flex space-x-8">
                            <Link href="/" className="text-[#00ffff] hover:text-[#ff00ff] transition-colors duration-300">Home</Link>
                            <Link href="/recipes" className="text-[#00ffff] hover:text-[#ff00ff] transition-colors duration-300">Recipes</Link>
                            <Link href="/about" className="text-[#00ffff] hover:text-[#ff00ff] transition-colors duration-300">About Us</Link>
                            <Link href="/shop" className="text-[#00ffff] hover:text-[#ff00ff] transition-colors duration-300">Shop</Link>
                        </div>
                        <button
                            className="md:hidden text-[#00ffff]"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Menu />
                        </button>
                    </div>
                    {isMenuOpen && (
                        <motion.div
                            className="md:hidden mt-4 flex flex-col space-y-2 items-center"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <Link href="/" className="text-[#00ffff] hover:text-[#ff00ff] transition-colors duration-300">Home</Link>
                            <Link href="/recipes" className="text-[#00ffff] hover:text-[#ff00ff] transition-colors duration-300">Recipes</Link>
                            <Link href="/about" className="text-[#00ffff] hover:text-[#ff00ff] transition-colors duration-300">About Us</Link>
                            <Link href="/shop" className="text-[#00ffff] hover:text-[#ff00ff] transition-colors duration-300">Shop</Link>
                        </motion.div>
                    )}
                </nav>
            </div>

            {/* Main Content */}
            <div className="pt-24">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        ref={(el) => (slidesRef.current[index] = el)}
                        className="min-h-screen flex flex-col items-center justify-center px-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full max-w-4xl mx-auto"
                        >
                            <motion.h1
                                className="text-4xl md:text-6xl font-bold mb-8 text-center text-[#00ffff]"
                                style={{ animation: 'neon-pulse 1.5s ease-in-out infinite alternate' }}
                            >
                                {slide.title}
                            </motion.h1>
                            {slide.component}
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    )
}