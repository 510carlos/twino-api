import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Component() {
  return (
    <>
      <header className="flex items-center justify-between p-6 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold">Cocktail Recipe</h1>
        <Link className="text-white hover:text-gray-400" href="#">
          <HomeIcon className="w-6 h-6" />
          <span className="sr-only">Home</span>
        </Link>
      </header>
      <main className="p-6">
        <Card>
          <CardContent className="flex flex-col md:flex-row gap-6">
            <img
              alt="Cocktail Image"
              className="w-full h-auto md:w-1/2 rounded-lg"
              height="400"
              src="/placeholder.svg"
              style={{
                aspectRatio: "400/400",
                objectFit: "cover",
              }}
              width="400"
            />
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Mojito</h2>
              <p className="text-gray-600">
                A Mojito is a traditional Cuban highball that is made with white rum, sugar, lime juice, soda water, and
                mint.
              </p>
              <h3 className="text-2xl font-bold">Ingredients</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>10 fresh mint leaves</li>
                <li>1/2 lime, cut into 4 wedges</li>
                <li>2 tablespoons white sugar</li>
                <li>1 cup ice cubes</li>
                <li>1.5 fluid ounces white rum</li>
                <li>1/2 cup club soda</li>
              </ul>
              <h3 className="text-2xl font-bold">Instructions</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Muddle mint leaves and one lime wedge</li>
                <li>Add two more lime wedges and the sugar, and muddle again</li>
                <li>Fill the glass with ice. Pour the rum over the ice, and fill the glass with carbonated water</li>
                <li>Stir, taste, and add more sugar if desired</li>
              </ol>
              <div className="flex items-center space-x-4 mt-6">
                <span>Share this recipe:</span>
                <Link className="text-gray-800 hover:text-gray-600" href="#">
                  <FacebookIcon className="w-6 h-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link className="text-gray-800 hover:text-gray-600" href="#">
                  <TwitterIcon className="w-6 h-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link className="text-gray-800 hover:text-gray-600" href="#">
                  <InstagramIcon className="w-6 h-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <h2 className="text-2xl font-bold">History of the Mojito</h2>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-bold">Origin</h3>
            <p className="text-gray-600">Your text here...</p>
            <h3 className="text-xl font-bold">Evolution Over Time</h3>
            <p className="text-gray-600">Your text here...</p>
            <h3 className="text-xl font-bold">Cultural and Social Impact</h3>
            <p className="text-gray-600">Your text here...</p>
            <h3 className="text-xl font-bold">Modern Interpretations</h3>
            <p className="text-gray-600">Your text here...</p>
            <h3 className="text-xl font-bold">Interesting Facts</h3>
            <p className="text-gray-600">Your text here...</p>
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <h2 className="text-2xl font-bold">Related Recipes</h2>
          </CardHeader>
          <CardContent className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <div className="space-y-2">
              <img
                alt="Cocktail Image"
                className="w-full h-auto rounded-lg"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="200"
              />
              <h3 className="font-bold">Margarita</h3>
              <p className="text-gray-600">A classic tequila-based cocktail</p>
              <Link className="text-blue-500 hover:underline" href="#">
                View Recipe
              </Link>
            </div>
            <div className="space-y-2">
              <img
                alt="Cocktail Image"
                className="w-full h-auto rounded-lg"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="200"
              />
              <h3 className="font-bold">Pina Colada</h3>
              <p className="text-gray-600">A sweet cocktail made with rum, coconut cream, and pineapple juice</p>
              <Link className="text-blue-500 hover:underline" href="#">
                View Recipe
              </Link>
            </div>
            <div className="space-y-2">
              <img
                alt="Cocktail Image"
                className="w-full h-auto rounded-lg"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="200"
              />
              <h3 className="font-bold">Bloody Mary</h3>
              <p className="text-gray-600">
                A popular cocktail containing vodka, tomato juice, and combinations of other spices
              </p>
              <Link className="text-blue-500 hover:underline" href="#">
                View Recipe
              </Link>
            </div>
            <div className="space-y-2">
              <img
                alt="Cocktail Image"
                className="w-full h-auto rounded-lg"
                height="200"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="200"
              />
              <h3 className="font-bold">Mimosa</h3>
              <p className="text-gray-600">
                A cocktail composed of equal parts champagne and chilled citrus juice, usually orange juice
              </p>
              <Link className="text-blue-500 hover:underline" href="#">
                View Recipe
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <footer className="p-6 bg-gray-800 text-white mt-6">
        <div className="flex items-center justify-between">
          <span>© 2023 Cocktail Recipes</span>
        </div>
      </footer>
    </>
  )
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}