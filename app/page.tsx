import { Metadata } from "next"
import { FiveOclockDeco } from "../components/FiveOclockDeco/FiveOclockDeco"

export const metadata: Metadata = {
  title: "The Weekend Is Never Over",
  description: "It is 5 o'clock somewhere. Curated drinks & timeless games for the sophisticated reveler.",
  twitter: {
    card: "summary_large_image",
  },
}

export default function Web() {
  return <FiveOclockDeco />
}
