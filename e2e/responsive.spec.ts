import { test, expect } from "@playwright/test";

test.describe("responsive shell", () => {
  for (const width of [375, 1440]) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const overflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      );
      expect(overflow, "page should not scroll horizontally").toBeLessThanOrEqual(1);
    });
  }

  test("declares viewport-fit=cover for edge-to-edge mobile", async ({ page }) => {
    await page.goto("/");
    const content = await page
      .locator('meta[name="viewport"]')
      .getAttribute("content");
    expect(content).toContain("viewport-fit=cover");
  });

  test("mobile menu opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const openBtn = page.getByRole("button", { name: /open menu/i });
    await expect(openBtn).toBeVisible();

    await openBtn.click();
    const mobileNav = page.getByRole("navigation", { name: "Mobile" });
    await expect(mobileNav).toBeVisible();

    // Toggle now reads "Close menu".
    await page.getByRole("button", { name: /close menu/i }).click();
    await expect(page.locator("#mobile-menu")).toBeHidden();
  });
});
