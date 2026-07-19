import { test, expect } from "@playwright/test";

test.describe("home page (scaffold smoke)", () => {
  test("loads with the VoltHub title and no console/page errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/");

    await expect(page).toHaveTitle(/VoltHub/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("VoltHub");
    expect(errors, `console/page errors:\n${errors.join("\n")}`).toEqual([]);
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
