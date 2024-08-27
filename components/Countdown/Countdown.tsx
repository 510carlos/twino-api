'use client';

import React, { useEffect, useState } from 'react';
import { cities } from './cities';
import { calculateTimeLeft, getCurrentTimeZone } from './Countdown.helper';

// Helper function to initialize the countdown data
const initializeCountdownData = () => {
    const initialZone = getCurrentTimeZone();
    if (initialZone && cities[initialZone]) {
        const cityData = cities[initialZone][0];
        const initialTimeLeft = calculateTimeLeft();

        return {
            timeLeft: initialTimeLeft,
            currentTimeZone: initialZone,
            locationData: {
                city: cityData.city,
                country: '', // Add the country if you have it in your data
                drink: cityData.drink,
                note: 'Enjoy responsibly!',
            },
        };
    }
    return null;
};

const Countdown = () => {
    const [countdownData, setCountdownData] = useState(initializeCountdownData());

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdownData((prevData) => ({
                ...prevData,
                timeLeft: calculateTimeLeft(),
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!countdownData) {
        return null;
    }

    const { timeLeft, currentTimeZone, locationData } = countdownData;
    const { minutes, seconds } = timeLeft;

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center text-black text-2xl">
            <h1 className="text-4xl font-bold">Countdown to 5:00 PM</h1>
            <div className="text-6xl my-4">
                {minutes.toString().padStart(2, '0')} : {seconds.toString().padStart(2, '0')}
            </div>
            <p>
                {locationData.drink} is the drink of choice in {locationData.city}, {locationData.country}.
            </p>
            <p>{locationData.note}</p>
            <p>Current time zone with 5:00 PM: {currentTimeZone}</p>
        </div>
    );
};

export default Countdown;
