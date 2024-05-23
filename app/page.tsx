import { Metadata } from "next"
// import LogoPage from "components/LogoPage"
import Preview from "../components/Preview"
// import Recipe from "../components/Recipe"



export const metadata: Metadata = {
  title: "The weekend is never over!",
  twitter: {
    card: "summary_large_image",
  },
  // openGraph: {
  //   url: "https://next-enterprise.vercel.app/",
  //   images: [
  //     {
  //       width: 1200,
  //       height: 630,
  //       url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/project-logo.png",
  //     },
  //   ],
  // },
}

export default function Web() {
  return (
    <>
      <Preview />
    </>
  )
}
