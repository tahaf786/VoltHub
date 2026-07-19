import { defineConfig, devices } from "@playwright/test";

// E2E covers behaviour/rendering on BOTH desktop and mobile Chromium:
// stacking, dialogs, forms, nav, responsiveness, security headers.
// The dev server (isDev) is used on purpose — production-only CSP directives
// (upgrade-insecure-requests / HSTS) would fight http://localhost. See CLAUDE.md §7.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : "list",
  use: {
    // Dedicated port (NOT 3000) so a concurrent dev server for another project
    // can never be reused in its place. See CLAUDE.md §7.8.
    baseURL: "http://localhost:3411",
    trace: "on-first-retry",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "npm run dev -- -p 3411",
    url: "http://localhost:3411",
    // Always start a FRESH VoltHub server — never reuse whatever happens to be
    // running, which caused tests to run against the wrong app.
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
