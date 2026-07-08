import Link from "next/link"

type LegalSection = {
  title: string
  body: string[]
}

type LegalDocumentProps = {
  eyebrow: string
  title: string
  effectiveDate: string
  intro: string
  sections: LegalSection[]
}

export function LegalDocument({ eyebrow, title, effectiveDate, intro, sections }: LegalDocumentProps) {
  return (
    <main className="legal-page">
      <div className="legal-shell">
        <nav className="legal-nav" aria-label="Legal navigation">
          <Link href="/">Home</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
        <p className="legal-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="legal-effective">Effective date: {effectiveDate}</p>
        <p className="legal-intro">{intro}</p>
        <div className="legal-sections">
          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
