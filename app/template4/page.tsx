'use client'

import { motion } from 'framer-motion'
import React, { useCallback, useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import './global.css'
import { Brand } from './components/Brand'
import { CountdownTimer } from './components/CountdownTimer'
import { Header } from './components/Header'
import { ProgressBar } from './components/ProgressBar'
import { RecipeComponent } from './components/RecipeComponent'
import { data } from './data'
import { pickDrink, useCountdown } from './helper'



// Main Application Component
export default function MergedTemplate() {
    const [drink, setDrink] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedDrink = localStorage.getItem('currentDrink');
            const savedTimestamp = localStorage.getItem('drinkTimestamp');
            const now = new Date();

            if (savedDrink && savedTimestamp) {
                const savedDate = new Date(parseInt(savedTimestamp, 10));
                if (now.getHours() === savedDate.getHours()) {
                    setDrink(JSON.parse(savedDrink));
                    return;
                }
            }

            const defaultDrink = pickDrink(data);
            localStorage.setItem('currentDrink', JSON.stringify(defaultDrink));
            localStorage.setItem('drinkTimestamp', now.getTime().toString());
            setDrink(defaultDrink);
        }
    }, []);

    const [isHovering, setIsHovering] = useState('')

    const handleHourChange = useCallback(() => {
        const newDrink = pickDrink(data);
        setDrink(newDrink);
        if (typeof window !== 'undefined') {
            localStorage.setItem('currentDrink', JSON.stringify(newDrink));
            localStorage.setItem('drinkTimestamp', new Date().getTime().toString());
        }
    }, []);

    const { timeLeft, showConfetti } = useCountdown(handleHourChange);

    if (!drink) return null; // Add a loading state or fallback UI here if needed

    const {
        location = '',
        drinkName = '',
        videoUrl = '',
        ingredients = [],
        instructions = ''
    } = drink;

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
                        <CountdownTimer location={location} drinkName={drinkName} timeLeft={timeLeft} setIsHovering={setIsHovering} isHovering={isHovering} />
                    </motion.div>
                </section>

                {/* YouTube Video Section */}
                <section className="flex flex-col items-center justify-center px-4">
                    <iframe
                        width="560"
                        height="315"
                        src={videoUrl}
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
                        <RecipeComponent ingredients={ingredients} instructions={instructions} />
                    </motion.div>
                </section>
            </main>
        </div>
    )
}