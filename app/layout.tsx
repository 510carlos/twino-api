import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Orbitron, Cinzel, Cormorant_Garamond } from "next/font/google"
import { StructuredData } from "../components/StructuredData"

const siteUrl = "https://theweekendisneverover.com"
const siteName = "The Weekend Is Never Over"
const siteDescription =
  "A live 5 o'clock somewhere countdown with world drinks, local recommendations, and timeless game-night links."

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: `${siteName} | 5 O'Clock Somewhere`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: `${siteName} | 5 O'Clock Somewhere`,
    description: siteDescription,
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
    title: `${siteName} | 5 O'Clock Somewhere`,
    description: siteDescription,
    images: ["/og-image.webp"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#1a211c",
  colorScheme: "dark",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${cinzel.variable} ${cormorant.variable}`}>
      <body className="bg-black">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
        <StructuredData />
      </body>
    </html>
  )
}
