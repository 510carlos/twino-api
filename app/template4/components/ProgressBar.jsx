'use client';

import { motion } from 'framer-motion'

export const ProgressBar = ({ timeLeft }) => (
    <div className="w-full h-3 bg-[#1a1a1a] relative overflow-hidden">
        <motion.div
            className="absolute inset-y-1"
            style={{
                left: '49%',
                right: '49%',
                background: 'linear-gradient(89deg, #00ffff, #ff00ff)',
                boxShadow: '-1 0 10px #00ffff, 0 0 20px #ff00ff',
                animation: 'progress-glow 1s linear infinite',
            }}
            animate={{
                left: `${50 - (timeLeft / 60) * 50}%`,
                right: `${50 - (timeLeft / 60) * 50}%`,
            }}
            transition={{ duration: 0.5, ease: 'linear' }}
        />
        <motion.div
            className="absolute top-1 left-0 h-full w-full"
            style={{
                background: 'linear-gradient(89deg, transparent, rgba(255,255,255,0.1), transparent)',
                backgroundSize: '199% 100%',
            }}
            animate={{
                backgroundPosition: ['99% 0%', '-100% 0%'],
            }}
            transition={{
                repeat: Infinity,
                duration: 0.5,
                ease: 'linear',
            }}
        />
    </div>
);