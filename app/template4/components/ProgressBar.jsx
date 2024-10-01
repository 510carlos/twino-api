'use client'

import { motion } from 'framer-motion'

// Progress Bar Component
export const ProgressBar = ({ timeLeft }) => (
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
                left: `${50 - (timeLeft / 3600) * 50}%`,
                right: `${50 - (timeLeft / 3600) * 50}%`,
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