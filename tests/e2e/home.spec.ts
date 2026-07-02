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
})
