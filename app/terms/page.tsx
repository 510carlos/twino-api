import type { Metadata } from "next"
import Link from "next/link"
import { LegalDocument } from "../../components/LegalDocument"

const effectiveDate = "July 2, 2026"

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms for using The Weekend Is Never Over website, drink content, countdown features, and game links.",
  alternates: {
    canonical: "/terms",
  },
}

export default function TermsPage() {
  return (
    <>
      <LegalDocument
        eyebrow="Terms"
        title="Terms & Conditions"
        effectiveDate={effectiveDate}
        intro="These Terms & Conditions govern your use of The Weekend Is Never Over website, including our countdown, drink content, game-night links, and related pages."
        sections={[
          {
            title: "Acceptance",
            body: [
              "By using the website, you agree to these Terms. If you do not agree, do not use the website.",
              "We may update these Terms from time to time. The effective date above shows when this version became effective.",
            ],
          },
          {
            title: "Age And Responsible Use",
            body: [
              "The site includes drink and beverage content. Alcohol-related content is intended only for people who are of legal drinking age in their location.",
              "Do not drink and drive. Drink responsibly, follow local law, and do not rely on this site as health, legal, or safety advice.",
              "The site is not intended for children under 13.",
            ],
          },
          {
            title: "Content",
            body: [
              "Drink recipes, local countdowns, location information, and game descriptions are provided for general entertainment and informational purposes.",
              "We try to keep content useful and accurate, but we do not guarantee that every recipe, time zone, image, link, or description will be complete, current, or error-free.",
            ],
          },
          {
            title: "Games And External Services",
            body: [
              "Game links may take you to games.theweekendisneverover.com or another related service. Additional rules, policies, or terms may apply there.",
              "We may change, suspend, or remove any game link, recipe, countdown, page, or feature at any time.",
            ],
          },
          {
            title: "Acceptable Use",
            body: [
              "Do not misuse the website, interfere with its operation, attempt unauthorized access, scrape at abusive rates, introduce malware, or use the website to violate law or the rights of others.",
              "Administrator features, if available to you, may be used only by authorized users for legitimate site-management purposes.",
            ],
          },
          {
            title: "Intellectual Property",
            body: [
              "The website design, text, graphics, code, trademarks, and other materials are owned by The Weekend Is Never Over or its licensors unless otherwise stated.",
              "You may not copy, modify, distribute, or commercially exploit site materials without permission, except as allowed by law.",
            ],
          },
          {
            title: "Third-Party Links",
            body: [
              "The site may link to third-party websites or services. We do not control and are not responsible for third-party content, policies, or practices.",
            ],
          },
          {
            title: "Disclaimers",
            body: [
              "The website is provided as is and as available. To the maximum extent allowed by law, we disclaim warranties of merchantability, fitness for a particular purpose, non-infringement, availability, and accuracy.",
            ],
          },
          {
            title: "Limitation Of Liability",
            body: [
              "To the maximum extent allowed by law, The Weekend Is Never Over will not be liable for indirect, incidental, consequential, special, exemplary, or punitive damages, or for lost profits, data, goodwill, or business interruption arising from your use of the website.",
            ],
          },
          {
            title: "Governing Law",
            body: [
              "These Terms are governed by the laws of California and applicable United States law, without regard to conflict-of-law principles.",
            ],
          },
          {
            title: "Contact",
            body: ["For questions about these Terms, contact legal@theweekendisneverover.com."],
          },
        ]}
      />
      <p className="legal-crosslink">
        See also the <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </>
  )
}
