import { defineConfig, devices } from "@playwright/test"

const port = 65210
const host = `http://localhost:${port}`

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: host,
    trace: "on-first-retry",
  },
  webServer: {
    command: "corepack pnpm dev",
    url: host,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
    },
  ],
})
