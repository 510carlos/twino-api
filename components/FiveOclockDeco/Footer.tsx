import Link from "next/link"

const links = [
  { label: "Games", href: "https://games.theweekendisneverover.com" },
  { label: "Home", href: "/" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
]

export function Footer() {
  return (
    <footer className="reveal-item">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              THE WEEKEND
              <br />
              IS NEVER OVER
            </div>
            <div className="copyright">&copy; 2026 All Rights Reserved.</div>
          </div>
          <nav className="footer-socials" aria-label="Footer">
            {links.map((link) =>
              link.href.startsWith("/") ? (
                <Link href={link.href} key={link.label}>
                  {link.label}
                </Link>
              ) : (
                <a href={link.href} key={link.label}>
                  {link.label}
                </a>
              )
            )}
          </nav>
          <div className="footer-note">
            <p>No account needed. Play in seconds.</p>
            <p>Newsletter signup will return only after email delivery and privacy disclosure are ready.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
