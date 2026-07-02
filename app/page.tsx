import { Metadata } from "next"
import { FiveOclockDeco } from "../components/FiveOclockDeco/FiveOclockDeco"

export const metadata: Metadata = {
  title: {
    absolute: "The Weekend Is Never Over | 5 O'Clock Somewhere",
  },
  description: "It is 5 o'clock somewhere. Curated drinks & timeless games for the sophisticated reveler.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Weekend Is Never Over | 5 O'Clock Somewhere",
    description: "It is 5 o'clock somewhere. Curated drinks & timeless games for the sophisticated reveler.",
    url: "/",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "The Weekend Is Never Over art-deco countdown homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Weekend Is Never Over | 5 O'Clock Somewhere",
    description: "It is 5 o'clock somewhere. Curated drinks & timeless games for the sophisticated reveler.",
    images: ["/og-image.webp"],
  },
}

export default function Web() {
  return <FiveOclockDeco />
}
