import { AnimatePresence, motion } from 'framer-motion'


export const RecipeComponent = () => (
    <motion.div
        className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-8 rounded-3xl max-w-2xl mx-auto shadow-lg mt-12 mb-16"
        style={{
            boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
            animation: 'laser-border 3s linear infinite', // Adding the glow effect
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <h2 className="text-4xl font-bold mb-6 text-center text-[#00ffff] animate-pulse">Margarita Recipe</h2>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <h3 className="text-2xl font-semibold mb-4 text-[#ff00ff]">Ingredients</h3>
                <ul className="list-disc list-inside text-[#e0e0e0] space-y-2">
                    <li>2 oz tequila</li>
                    <li>1 oz lime juice</li>
                    <li>1 oz Cointreau or Triple Sec</li>
                    <li>Salt for rimming</li>
                    <li>Lime wedge for garnish</li>
                    <li>Ice</li>
                </ul>
            </div>
            <div className="space-y-4">
                <h3 className="text-2xl font-semibold mb-4 text-[#ff00ff]">Instructions</h3>
                <ol className="list-decimal list-inside text-[#e0e0e0] space-y-2">
                    <li>Rim a glass with salt</li>
                    <li>Fill a shaker with ice</li>
                    <li>Add tequila, lime juice, and Cointreau</li>
                    <li>Shake well for about 10 seconds</li>
                    <li>Strain into the prepared glass over ice</li>
                    <li>Garnish with a lime wedge</li>
                    <li>Enjoy responsibly!</li>
                </ol>
            </div>
        </div>
    </motion.div>
);