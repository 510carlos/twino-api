const siteUrl = "https://theweekendisneverover.com"

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "The Weekend Is Never Over",
      url: siteUrl,
      description: "A live 5 o'clock somewhere countdown with world drinks and timeless game-night links.",
      inLanguage: "en-US",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "The Weekend Is Never Over",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/twino.png`,
      },
    },
  ],
}

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  )
}
