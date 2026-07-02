import { expect, test } from "@playwright/test"

test.describe("homepage", () => {
  test("renders the landing page and game links", async ({ page }) => {
    await page.goto("/")

    await expect(page.getByRole("heading", { name: /the weekend is never over/i })).toBeVisible()
    await expect(page.getByText(/it is 5 o'clock somewhere/i)).toBeVisible()
    await expect(page.getByText(/countdown/i)).toBeVisible()
    await expect(page.getByText(/local drink of choice/i)).toBeVisible()
    await expect(page.getByRole("heading", { name: /game night/i })).toBeVisible()

    await expect(page.locator(".game-title-link", { hasText: "Crazy Eights" })).toHaveAttribute(
      "href",
      "https://games.theweekendisneverover.com/crazy-eights"
    )
    await expect(page.locator(".game-title-link", { hasText: "Translation Cards" })).toHaveAttribute(
      "href",
      "https://games.theweekendisneverover.com/translation-cards"
    )
    await expect(page.locator(".game-title-link", { hasText: "Loteria" })).toHaveAttribute(
      "href",
      "https://games.theweekendisneverover.com/loteria"
    )
  })

  test("keeps the health endpoint available", async ({ request }) => {
    const response = await request.get("/api/health")

    await expect(response).toBeOK()
    await expect(response.json()).resolves.toEqual({ status: "ok" })
  })

  test("does not expose placeholder links and supports keyboard focus", async ({ page }) => {
    await page.goto("/")

    await expect(page.locator('a[href="#"]')).toHaveCount(0)
    await expect(page.getByRole("button", { name: /subscribe/i })).toHaveCount(0)
    await expect(page.getByLabel("Email address")).toHaveCount(0)
    await expect(page.getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/privacy")
    await expect(page.getByRole("link", { name: "Terms" })).toHaveAttribute("href", "/terms")

    await page.keyboard.press("Tab")
    await expect(page.locator(":focus")).toHaveText(/skip to content/i)
  })

  test("captures visual smoke screenshots", async ({ page }, testInfo) => {
    await page.goto("/")
    await expect(page.getByRole("heading", { name: /the weekend is never over/i })).toBeVisible()

    await page.screenshot({
      fullPage: true,
      path: testInfo.outputPath(`home-${testInfo.project.name}.png`),
    })
  })
})
