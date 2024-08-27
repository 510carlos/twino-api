'use client';

import React, { useEffect, useState } from 'react';
import { cities } from './cities'; // Adjust the import path as necessary
import { groupTimeZonesByWholeHours, selectPopularTimeZonesForWholeHours } from './helper';

const NumberedTimeZones = () => {
    const [timeZones, setTimeZones] = useState([]);

    useEffect(() => {
        const groupedTimeZones = groupTimeZonesByWholeHours();
        const popularZones = selectPopularTimeZonesForWholeHours(groupedTimeZones);
        setTimeZones(popularZones);
    }, []);

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-start text-black text-lg p-4 bg-white">
            <h1 className="text-4xl font-bold mb-8">Popular Time Zones by Hour</h1>
            <ol className="list-decimal">
                {timeZones.map((item, index) => (
                    <li key={index} className="my-2">
                        {item.zone.replace('_', ' ')} - {item.offset} UTC
                        <ul className="list-disc ml-5">
                            {cities[item.zone]?.map((cityInfo, i) => (
                                <li key={i}>
                                    {cityInfo.city} - Popular Drink: {cityInfo.drink}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default NumberedTimeZones;
