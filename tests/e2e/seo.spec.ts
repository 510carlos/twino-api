import { expect, test } from "@playwright/test"

test.describe("seo and legal routes", () => {
  test("home page exposes production metadata and structured data", async ({ page }) => {
    await page.goto("/")

    await expect(page).toHaveTitle(/The Weekend Is Never Over/)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /5 o'clock somewhere/i)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /^https:\/\/theweekendisneverover\.com\/?$/
    )
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://theweekendisneverover.com/og-image.webp"
    )

    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent()
    expect(jsonLd).toContain('"@type":"WebSite"')
    expect(jsonLd).toContain('"@type":"Organization"')
  })

  test("privacy and terms pages render and cross-link", async ({ page }) => {
    await page.goto("/privacy")
    await expect(page.getByRole("heading", { name: "Privacy Policy" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Terms & Conditions" })).toHaveAttribute("href", "/terms")

    await page.goto("/terms")
    await expect(page.getByRole("heading", { name: "Terms & Conditions" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/privacy")
  })

  test("robots and sitemap are available", async ({ request }) => {
    const robots = await request.get("/robots.txt")
    await expect(robots).toBeOK()
    await expect(await robots.text()).toContain("Sitemap: https://theweekendisneverover.com/sitemap.xml")

    const sitemap = await request.get("/sitemap.xml")
    await expect(sitemap).toBeOK()
    const xml = await sitemap.text()
    expect(xml).toContain("https://theweekendisneverover.com")
    expect(xml).toContain("https://theweekendisneverover.com/privacy")
    expect(xml).toContain("https://theweekendisneverover.com/terms")
  })
})
