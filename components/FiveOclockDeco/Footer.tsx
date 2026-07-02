const socials = ["Instagram", "Facebook", "X", "Pinterest"]

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
          <div className="footer-socials">
            {socials.map((social) => (
              <a href="#" aria-label={social} key={social}>
                <svg className="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </a>
            ))}
          </div>
          <div className="footer-newsletter">
            <span className="newsletter-text">Newsletter for exclusive offers and updates.</span>
            <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
              <input type="email" placeholder="Enter your email" required aria-label="Email address" />
              <button type="submit">Subscribe</button>
            </form>
            <div className="footer-links">
              <a href="#">Terms &amp; Conditions</a> | <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
