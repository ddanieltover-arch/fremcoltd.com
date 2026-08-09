import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PLAYWRIGHT_PORT ?? 3100);
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  timeout: 60_000,
  expect: { timeout: 15_000 },
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        // Production server matches CI and avoids Next.js dev cross-origin Server Action issues.
        command: `npm run start -- --port ${PORT}`,
        url: baseURL,
        reuseExistingServer: false,
        timeout: 180_000,
        env: {
          ...process.env,
          E2E_BYPASS_EMAIL: "1",
          NEXT_PUBLIC_URL: "https://fremcoltd.com",
          NEXT_PUBLIC_SITE_NAME: "FREEM ENTERPRISE CO., LTD",
        },
      },
});
