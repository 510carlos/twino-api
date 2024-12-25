import Link from 'next/link';
import { serverClient } from '../../../lib/trpc/serverClient';

type PageProps = {
    params: {
        name: string;
    };
};

const DrinkPage = async ({ params }: PageProps) => {
    const { name } = await params;
    const client = await serverClient();
    const drink = await client.drinks.getByName({ name });

    return (
        <div className="container mx-auto px-4 py-8">
            <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 hover:underline mb-8 inline-block"
            >
                ← Back to Drinks
            </Link>

            <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
                <h1 className="text-3xl font-bold mb-4">{drink.name}</h1>
                <p className="text-gray-600 mb-6">{drink.description}</p>

                <div>
                    <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
                    <ul className="list-disc list-inside space-y-2">
                        {drink.ingredients.map((ingredient, index) => (
                            <li key={index} className="text-gray-700">
                                {ingredient}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DrinkPage;
