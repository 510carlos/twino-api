import Link from "next/link"

const links = [
  { label: "Games", href: "https://games.theweekendisneverover.com" },
  { label: "Home", href: "/" },
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
          <div className="footer-newsletter">
            <span className="newsletter-text">Newsletter for exclusive offers and updates.</span>
            <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
              <input type="email" placeholder="Enter your email" required aria-label="Email address" />
              <button type="submit">Subscribe</button>
            </form>
            <p className="footer-links">No account needed. No newsletter signup is submitted yet.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
