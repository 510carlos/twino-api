import Link from 'next/link'

// Header Component
export const Header = () => (
    <header className="bg-transparent p-4">
        <div className="container mx-auto flex justify-center items-center">
            <nav className="flex space-x-8">
                <Link href="/" className="text-[#00ffff] hover:text-[#ff00ff] transition-colors duration-300">Home</Link>
                <Link href="/recipes" className="text-[#00ffff] hover:text-[#ff00ff] transition-colors duration-300">Recipes</Link>
                <Link href="/about" className="text-[#00ffff] hover:text-[#ff00ff] transition-colors duration-300">About Us</Link>
                <Link href="/shop" className="text-[#00ffff] hover:text-[#ff00ff] transition-colors duration-300">Shop</Link>
            </nav>
        </div>
    </header>
);