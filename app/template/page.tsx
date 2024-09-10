'use client';

import confetti from 'canvas-confetti'
import { Clock, Droplet, GlassWater, MapPin, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const timeZones = [
    { city: 'New York', drink: 'Manhattan', offset: -4, coordinates: { x: 25, y: 35 } },
    { city: 'London', drink: 'Pimm\'s Cup', offset: 1, coordinates: { x: 47, y: 30 } },
    { city: 'Tokyo', drink: 'Matcha Highball', offset: 9, coordinates: { x: 82, y: 40 } },
    { city: 'Sydney', drink: 'Pavlova Martini', offset: 10, coordinates: { x: 88, y: 80 } },
    { city: 'Rio de Janeiro', drink: 'Caipirinha', offset: -3, coordinates: { x: 35, y: 70 } },
]

const drinkInfo = {
    'Manhattan': {
        description: 'A classic cocktail made with whiskey, sweet vermouth, and bitters.',
        ingredients: ['2 oz rye whiskey', '1 oz sweet vermouth', '2 dashes Angostura bitters', 'Maraschino cherry for garnish'],
        recipe: [
            'Fill a mixing glass with ice.',
            'Add whiskey, vermouth, and bitters. Stir well.',
            'Strain into a chilled cocktail glass.',
            'Garnish with a maraschino cherry.',
        ],
        image: '/placeholder.svg?height=300&width=300',
    },
    'Pimm\'s Cup': {
        description: 'A refreshing British summer cocktail made with Pimm\'s No. 1 Cup and lemonade.',
        ingredients: ['2 oz Pimm\'s No. 1 Cup', '4 oz lemonade', 'Cucumber slice', 'Orange slice', 'Strawberry', 'Mint sprig'],
        recipe: [
            'Fill a tall glass with ice.',
            'Add Pimm\'s No. 1 Cup and lemonade.',
            'Stir gently to combine.',
            'Garnish with cucumber, orange, strawberry, and mint.',
        ],
        image: '/placeholder.svg?height=300&width=300',
    },
    'Matcha Highball': {
        description: 'A modern Japanese cocktail combining the earthy flavors of matcha with the effervescence of a highball.',
        ingredients: ['1.5 oz Japanese whisky', '0.5 oz matcha syrup', '4 oz soda water', 'Lemon twist for garnish'],
        recipe: [
            'Fill a highball glass with ice.',
            'Add whisky and matcha syrup.',
            'Top with soda water and stir gently.',
            'Garnish with a lemon twist.',
        ],
        image: '/placeholder.svg?height=300&width=300',
    },
    'Pavlova Martini': {
        description: 'A dessert-inspired cocktail that captures the essence of the classic Australian pavlova.',
        ingredients: ['2 oz vanilla vodka', '1 oz passion fruit liqueur', '1 oz fresh lemon juice', '0.5 oz simple syrup', 'Egg white', 'Fresh berries for garnish'],
        recipe: [
            'Add all ingredients except berries to a shaker without ice. Dry shake.',
            'Add ice and shake again until well-chilled.',
            'Double strain into a chilled martini glass.',
            'Garnish with fresh berries.',
        ],
        image: '/placeholder.svg?height=300&width=300',
    },
    'Caipirinha': {
        description: 'Brazil\'s national cocktail, made with cachaça, lime, and sugar.',
        ingredients: ['2 oz cachaça', '1 lime, cut into wedges', '2 tsp sugar', 'Crushed ice'],
        recipe: [
            'In a rocks glass, muddle the lime wedges with sugar.',
            'Fill the glass with crushed ice.',
            'Pour cachaça over the ice.',
            'Stir well and serve.',
        ],
        image: '/placeholder.svg?height=300&width=300',
    },
}

export default function Component() {
    const [currentZoneIndex, setCurrentZoneIndex] = useState(0)
    const [countdown, setCountdown] = useState(300) // 5 minutes countdown
    const [isMuted, setIsMuted] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCount) => {
                if (prevCount === 0) {
                    setCurrentZoneIndex((prevIndex) => (prevIndex + 1) % timeZones.length)
                    celebrateNewTimeZone()
                    return 300 // Reset to 5 minutes
                }
                return prevCount - 1
            })
        }, 1000)

        // Simulate loading delay
        setTimeout(() => setIsLoaded(true), 1000)

        return () => clearInterval(timer)
    }, [])

    const celebrateNewTimeZone = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        })
        if (!isMuted && audioRef.current) {
            audioRef.current.play()
        }
    }

    const toggleMute = () => {
        setIsMuted(!isMuted)
    }

    const currentZone = timeZones[currentZoneIndex]
    const currentDrink = drinkInfo[currentZone.drink]
    const progress = ((300 - countdown) / 300) * 100

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white p-8 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 space-y-4">
                    <h1
                        className={`text-4xl md:text-6xl font-bold text-shadow transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
                            }`}
                    >
                        The Weekend Is Never Over
                    </h1>
                    <p
                        className={`text-2xl md:text-3xl font-semibold text-yellow-200 transition-all duration-1000 ease-out delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        It&apos;s 5:00 O&apos;clock Somewhere
                    </p>
                </div>

                <Card className={`bg-white/20 backdrop-blur-lg shadow-xl mb-8 overflow-hidden transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold flex items-center justify-between">
                            <span className="flex items-center">
                                <MapPin className="mr-2" />
                                {currentZone.city}
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center mb-6">
                            <Clock className="w-16 h-16 mb-2 text-yellow-300" />
                            <div className="text-6xl md:text-7xl font-bold text-yellow-300">
                                {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                            </div>
                        </div>
                        <h2 className="text-2xl font-semibold mb-2 text-center">Drink of Choice: {currentZone.drink}</h2>
                        <p className="text-lg mb-4 text-center">{currentDrink.description}</p>
                        <Progress value={progress} className="h-2 mb-2" />
                        <p className="text-sm text-right">Next destination in {countdown} seconds</p>
                    </CardContent>
                </Card>

                <div className={`grid md:grid-cols-3 gap-8 mb-8 transition-all duration-1000 ease-out delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                    <Card className="bg-white/20 backdrop-blur-lg shadow-xl col-span-2">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold">World Map</CardTitle>
                        </CardHeader>
                        <CardContent className="relative h-64">
                            <div className="absolute inset-0 bg-blue-900/50 rounded-lg overflow-hidden">
                                {timeZones.map((zone, index) => (
                                    <div
                                        key={zone.city}
                                        className={`absolute w-4 h-4 rounded-full ${index === currentZoneIndex ? 'bg-yellow-300 animate-ping' : 'bg-red-500'
                                            }`}
                                        style={{
                                            left: `${zone.coordinates.x}%`,
                                            top: `${zone.coordinates.y}%`,
                                        }}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/20 backdrop-blur-lg shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold">Ingredients</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {currentDrink.ingredients.map((ingredient, index) => (
                                    <li key={index} className="flex items-center">
                                        <Droplet className="mr-2 h-5 w-5" />
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <div className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 ease-out delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                    <Card className="bg-white/20 backdrop-blur-lg shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold">Recipe</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ol className="list-decimal list-inside space-y-2">
                                {currentDrink.recipe.map((step, index) => (
                                    <li key={index} className="flex items-start">
                                        <GlassWater className="mr-2 h-5 w-5 mt-1 shrink-0" />
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </CardContent>
                    </Card>

                    <Card className="bg-white/20 backdrop-blur-lg shadow-xl">
                        <CardContent className="flex items-center justify-center">
                            <img
                                src={currentDrink.image}
                                alt={currentZone.drink}
                                className="rounded-lg shadow-lg max-w-full h-auto transition-transform duration-300 hover:scale-105"
                                width={300}
                                height={300}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className={`mt-8 text-center transition-all duration-1000 ease-out delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                    <Button onClick={toggleMute} variant="outline" size="icon" className="bg-white/20">
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                </div>
            </div>

            <audio ref={audioRef} src="/path-to-celebration-sound.mp3" />
        </div>
    )
}