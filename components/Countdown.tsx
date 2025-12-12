"use client";

import { useEffect, useState } from "react";

// Static list of cities - one per major timezone offset
const HAPPY_HOUR_CITIES = [
  { timezone: "Pacific/Auckland", city: "Auckland", country: "New Zealand", drink: "Sauvignon Blanc" },
  { timezone: "Pacific/Fiji", city: "Suva", country: "Fiji", drink: "Fiji Gold Beer" },
  { timezone: "Australia/Sydney", city: "Sydney", country: "Australia", drink: "Flat White Martini" },
  { timezone: "Asia/Tokyo", city: "Tokyo", country: "Japan", drink: "Sake" },
  { timezone: "Asia/Seoul", city: "Seoul", country: "South Korea", drink: "Soju" },
  { timezone: "Asia/Shanghai", city: "Shanghai", country: "China", drink: "Baijiu" },
  { timezone: "Asia/Bangkok", city: "Bangkok", country: "Thailand", drink: "Chang Beer" },
  { timezone: "Asia/Kolkata", city: "Mumbai", country: "India", drink: "Kingfisher Lager" },
  { timezone: "Asia/Dubai", city: "Dubai", country: "UAE", drink: "Arabic Coffee Cocktail" },
  { timezone: "Europe/Moscow", city: "Moscow", country: "Russia", drink: "Vodka" },
  { timezone: "Europe/Istanbul", city: "Istanbul", country: "Turkey", drink: "Raki" },
  { timezone: "Europe/Athens", city: "Athens", country: "Greece", drink: "Ouzo" },
  { timezone: "Europe/Paris", city: "Paris", country: "France", drink: "Champagne" },
  { timezone: "Europe/London", city: "London", country: "UK", drink: "Gin & Tonic" },
  { timezone: "Atlantic/Reykjavik", city: "Reykjavik", country: "Iceland", drink: "Brennivín" },
  { timezone: "America/Sao_Paulo", city: "São Paulo", country: "Brazil", drink: "Caipirinha" },
  { timezone: "America/New_York", city: "New York", country: "USA", drink: "Manhattan" },
  { timezone: "America/Chicago", city: "Chicago", country: "USA", drink: "Old Fashioned" },
  { timezone: "America/Denver", city: "Denver", country: "USA", drink: "Craft Beer" },
  { timezone: "America/Los_Angeles", city: "Los Angeles", country: "USA", drink: "Margarita" },
  { timezone: "America/Anchorage", city: "Anchorage", country: "USA", drink: "Alaskan Amber" },
  { timezone: "Pacific/Honolulu", city: "Honolulu", country: "Hawaii", drink: "Mai Tai" },
  { timezone: "America/Mexico_City", city: "Mexico City", country: "Mexico", drink: "Tequila Sunrise" },
  { timezone: "America/Lima", city: "Lima", country: "Peru", drink: "Pisco Sour" },
];

// Find which city is approaching 5PM (currently 4PM)
function getHappyHourCity(): typeof HAPPY_HOUR_CITIES[0] | null {
  const now = new Date();

  for (const location of HAPPY_HOUR_CITIES) {
    try {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: location.timezone,
        hour: "numeric",
        hour12: false,
      });
      const hour = parseInt(formatter.format(now), 10);

      // If it's 4PM (16:00) in this timezone, they're approaching 5PM
      if (hour === 16) {
        return location;
      }
    } catch {
      // Skip invalid timezones
      continue;
    }
  }

  // Fallback - return a random city
  return HAPPY_HOUR_CITIES[Math.floor(Math.random() * HAPPY_HOUR_CITIES.length)];
}

// Get time remaining until next hour
function getTimeUntilNextHour(): { minutes: number; seconds: number } {
  const now = new Date();
  const minutes = 59 - now.getMinutes();
  const seconds = 59 - now.getSeconds();
  return { minutes, seconds };
}

export function Countdown() {
  const [time, setTime] = useState({ minutes: 59, seconds: 59 });
  const [location, setLocation] = useState<typeof HAPPY_HOUR_CITIES[0] | null>(null);
  const [mounted, setMounted] = useState(false);

  // Initial mount - set time and location
  useEffect(() => {
    setMounted(true);
    setTime(getTimeUntilNextHour());
    setLocation(getHappyHourCity());
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        let { minutes, seconds } = prev;

        if (seconds === 0) {
          if (minutes === 0) {
            // Reset and get new location
            setLocation(getHappyHourCity());
            return { minutes: 59, seconds: 59 };
          }
          return { minutes: minutes - 1, seconds: 59 };
        }

        return { minutes, seconds: seconds - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [mounted]);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4">
      {/* Countdown display */}
      <div className="relative">
        <div
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl 2xl:text-[10rem] font-bold tracking-wider font-[family-name:var(--font-orbitron)]"
          style={{
            background: "linear-gradient(135deg, #ff00ff, #00ffff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textShadow: "0 0 40px rgba(255, 0, 255, 0.5), 0 0 80px rgba(0, 255, 255, 0.3)",
            filter: "drop-shadow(0 0 20px rgba(255, 0, 255, 0.4))",
          }}
        >
          {mounted ? `${pad(time.minutes)}:${pad(time.seconds)}` : "59:59"}
        </div>
      </div>

      {/* Label */}
      <p className="text-white/70 text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl mt-2 sm:mt-3 md:mt-4 tracking-wide">
        until 5 o&apos;clock somewhere
      </p>

      {/* Location and drink */}
      {location && mounted && (
        <div className="mt-4 sm:mt-6 md:mt-8 space-y-1 sm:space-y-2">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-light text-white">
            <span
              className="font-semibold"
              style={{
                background: "linear-gradient(135deg, #ff00ff, #00ffff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {location.drink}
            </span>
          </p>
          <p className="text-white/60 text-sm sm:text-base md:text-lg 2xl:text-xl">
            is the drink of choice in {location.city}, {location.country}
          </p>
        </div>
      )}
    </div>
  );
}

export default Countdown;
