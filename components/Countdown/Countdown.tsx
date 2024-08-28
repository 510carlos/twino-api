'use client';

import React, { useEffect, useState } from 'react';
import { cities } from './cities';
import { calculateTimeLeft, getCurrentTimeZone, getNextTimeZone } from './Countdown.helper';

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
            setCountdownData((prevData) => {
                const newTimeLeft = calculateTimeLeft();

                if (newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
                    const nextZone = getNextTimeZone(prevData.currentTimeZone);
                    const nextCityData = cities[nextZone][0];

                    return {
                        timeLeft: calculateTimeLeft(),
                        currentTimeZone: nextZone,
                        locationData: {
                            city: nextCityData.city,
                            country: '', // Add the country if you have it in your data
                            drink: nextCityData.drink,
                            note: 'Enjoy responsibly!',
                        },
                    };
                }

                return {
                    ...prevData,
                    timeLeft: newTimeLeft,
                };
            });
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
