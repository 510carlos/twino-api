import { Metadata } from "next"
import Recipe from "../components/Recipe"
import { Button } from "components/Button/Button"
import { LP_GRID_ITEMS } from "lp-items"



export const metadata: Metadata = {
  title: "Next.js Enterprise Boilerplate",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://next-enterprise.vercel.app/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/project-logo.png",
      },
    ],
  },
}

export default function Web() {
  return (
    <>
    <Recipe />
    </>
  )
}
