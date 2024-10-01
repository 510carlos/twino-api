import { motion } from 'framer-motion'

// Brand Component
export const Brand = () => (
    <div className="text-center mb-8">
        <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-center text-[#00ffff]"
            style={{ animation: 'neon-pulse 1.5s ease-in-out infinite alternate' }}
        >
            The Weekend Is Never Over
        </motion.h1>
        <motion.h2
            className="text-2xl md:text-3xl font-semibold text-center text-[#ff00ff]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            It&apos;s 5:00 O&apos;clock Somewhere
        </motion.h2>
    </div>
);
