import { test, expect } from "@playwright/test";

// Sections in the order they should appear down the page (hero → footer).
const SECTION_IDS = ["top", "catalog", "skin-designer", "reservation", "store"];
// In-page nav targets (mirror siteConfig.nav).
const NAV_TARGETS = ["catalog", "skin-designer", "reservation", "store"];

test.describe("home page", () => {
  test("loads with the VoltHub title and no console/page errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/");

    await expect(page).toHaveTitle(/VoltHub/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Gear up your phone",
    );
    expect(errors, `console/page errors:\n${errors.join("\n")}`).toEqual([]);
  });

  test("renders all sections, in top-to-bottom order", async ({ page }) => {
    await page.goto("/");
    for (const id of SECTION_IDS) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
    const tops = await page.evaluate(
      (ids) =>
        ids.map((id) => {
          const el = document.getElementById(id);
          return el ? el.getBoundingClientRect().top + window.scrollY : NaN;
        }),
      SECTION_IDS,
    );
    const sorted = [...tops].sort((a, b) => a - b);
    expect(tops).toEqual(sorted);
  });

  test("every nav anchor resolves to a real section", async ({ page }) => {
    await page.goto("/");
    for (const id of NAV_TARGETS) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test("sends security headers and no x-powered-by", async ({ page }) => {
    const response = await page.goto("/");
    const headers = response?.headers() ?? {};

    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["content-security-policy"]).toContain("default-src 'self'");
    expect(headers["x-powered-by"]).toBeUndefined();
  });
});
