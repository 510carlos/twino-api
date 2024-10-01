// Countdown Timer Component
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { Coffee, MapPin } from 'lucide-react'

export const CountdownTimer = ({ timeLeft, setIsHovering, isHovering }) => {
    const formatTime = (time) => {
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