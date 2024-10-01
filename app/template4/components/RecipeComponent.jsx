import { motion } from 'framer-motion'


export const RecipeComponent = ({ingredients, instructions}) => (
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
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>
            <div className="space-y-4">
                <h3 className="text-2xl font-semibold mb-4 text-[#ff00ff]">Instructions</h3>
                <ol className="list-decimal list-inside text-[#e0e0e0] space-y-2">
                    {instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                    ))}
                </ol>
            </div>
        </div>
    </motion.div>
);