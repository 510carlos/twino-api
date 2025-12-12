'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Clock, Coffee, MapPin } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

export default function CountdownComponent() {
    const [timeLeft, setTimeLeft] = useState(60) // 1 minute in seconds
    const [isHovering, setIsHovering] = useState('')
    const [showConfetti, setShowConfetti] = useState(false)

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

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    const gradientStyle = {
        background: 'linear-gradient(45deg, #0a0a0a, #1a1a1a)',
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#050505] text-[#e0e0e0]">
            {showConfetti && <Confetti colors={['#00ffff', '#ff00ff', '#ffff00']} />}
            <style>{`
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

            {/* Enhanced Progress Bar */}
            <div className="w-full h-4 bg-[#1a1a1a] relative overflow-hidden">
                <motion.div
                    className="h-full"
                    style={{
                        background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
                        boxShadow: '0 0 10px #00ffff, 0 0 20px #ff00ff',
                        animation: 'progress-glow 2s linear infinite',
                    }}
                    initial={{ width: '100%', x: 0 }}
                    animate={{
                        width: `${(timeLeft / 60) * 100}%`,
                        x: ['-2%', '0%', '2%', '0%'],
                    }}
                    transition={{
                        width: { duration: 0.5, ease: 'linear' },
                        x: { repeat: Infinity, duration: 2, ease: 'easeInOut' }
                    }}
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

            <div className="grow flex flex-col items-center justify-center">
                <motion.h1
                    className="text-4xl md:text-6xl font-bold mb-2 text-center text-[#00ffff]"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ animation: 'neon-pulse 1.5s ease-in-out infinite alternate' }}
                >
                    The Weekend Is Never Over
                </motion.h1>
                <motion.h2
                    className="text-2xl md:text-3xl font-semibold mb-8 text-center text-[#ff00ff]"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    It&apos;s 5:00 O&apos;clock Somewhere
                </motion.h2>

                <motion.div
                    className="p-8 rounded-3xl"
                    style={{
                        ...gradientStyle,
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

                <motion.div
                    className="mt-8 text-center text-[#e0e0e0]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <Clock className="inline-block mr-2" />
                    <span>Counting down to 5:00 PM</span>
                </motion.div>
            </div>
        </div>
    )
}