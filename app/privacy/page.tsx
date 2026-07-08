import type { Metadata } from "next"
import Link from "next/link"
import { LegalDocument } from "../../components/LegalDocument"

const effectiveDate = "July 2, 2026"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How The Weekend Is Never Over handles privacy for the website, countdown, drink content, and game links.",
  alternates: {
    canonical: "/privacy",
  },
}

export default function PrivacyPage() {
  return (
    <>
      <LegalDocument
        eyebrow="Privacy"
        title="Privacy Policy"
        effectiveDate={effectiveDate}
        intro="This Privacy Policy explains what information The Weekend Is Never Over collects, how we use it, and the choices you have when you use our website."
        sections={[
          {
            title: "What We Collect",
            body: [
              "The public website does not offer a newsletter signup, checkout, public account creation, or a contact form.",
              "Like most websites, our hosting and security providers may process technical information such as IP address, browser type, device information, referring pages, pages viewed, and timestamps in server logs.",
            ],
          },
          {
            title: "How We Use Information",
            body: [
              "We use information to operate the website, show local countdown and drink content, maintain security, diagnose technical problems, prevent abuse, and improve the service.",
              "We may use aggregate, non-identifying technical information to understand whether the site is working well across devices and browsers.",
            ],
          },
          {
            title: "Cookies And Analytics",
            body: [
              "The current public home page does not intentionally set marketing cookies or include a third-party analytics SDK. Hosting, browser, or security infrastructure may still use logs or strictly necessary technical mechanisms to deliver the site.",
              "If analytics, advertising pixels, email marketing, payments, accounts, or affiliate links are added later, this policy should be updated to describe those providers and visitor choices.",
            ],
          },
          {
            title: "Third-Party Links",
            body: [
              "The website links to games at games.theweekendisneverover.com and may link to other third-party services. Those services may have their own privacy practices and terms.",
              "We are not responsible for the privacy practices of websites or services we do not control.",
            ],
          },
          {
            title: "Sharing",
            body: [
              "We do not sell personal information or share it for cross-context behavioral advertising based on the current implementation.",
              "We may share information with service providers that help host, secure, maintain, or administer the website, or when required by law or necessary to protect rights, safety, and security.",
            ],
          },
          {
            title: "Children",
            body: [
              "The website is not directed to children under 13. We do not knowingly collect personal information from children under 13.",
              "If you believe a child has provided personal information, contact us so we can review and delete it where appropriate.",
            ],
          },
          {
            title: "Your Choices",
            body: [
              "Depending on where you live, you may have rights to request access, correction, deletion, or portability of personal information, or to object to or limit certain processing.",
              "Because the current public site collects very little visitor-provided information, many requests may relate only to technical logs.",
            ],
          },
          {
            title: "Security And Retention",
            body: [
              "We use reasonable technical and organizational measures to protect information. No internet service is perfectly secure.",
              "We keep information only as long as reasonably needed for the purposes described in this policy, legal compliance, security, backups, and dispute resolution.",
            ],
          },
          {
            title: "Contact",
            body: ["For privacy questions or requests, contact theweekendisneverover@gmail.com."],
          },
        ]}
      />
      <p className="legal-crosslink">
        See also the <Link href="/terms">Terms & Conditions</Link>.
      </p>
    </>
  )
}
