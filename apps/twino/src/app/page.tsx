import Link from 'next/link';
import { serverClient } from '../lib/trpc/serverClient';
import { DrinkDocument } from '../server/db/schemas/drinks.schema';

const Home = async () => {
  const caller = await serverClient();
  const { items: drinks } = await caller.drinks.list({
    limit: 100 // Fetch up to 100 drinks
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Drinks</h1>
      <ul className="space-y-4">
        {drinks.map(({ name, id }: Pick<DrinkDocument, 'name' | 'id'>) => (
          <li key={id} className="hover:bg-gray-50 p-4 rounded-lg transition-colors">
            <Link
              href={`/drinks/${id}`}
              className="text-lg text-blue-600 hover:text-blue-800 hover:underline"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
