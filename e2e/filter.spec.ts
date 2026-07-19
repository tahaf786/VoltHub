import { test, expect } from "@playwright/test";

const items = (page: import("@playwright/test").Page) =>
  page.getByRole("list", { name: "Products" }).getByRole("listitem");

test.describe("catalog filters", () => {
  test("category chip narrows the grid", async ({ page }) => {
    await page.goto("/#catalog");
    const all = await items(page).count();

    await page.getByRole("button", { name: "Chargers", exact: true }).click();

    await expect(page.getByText("65W GaN Charger")).toBeVisible();
    await expect(page.getByText("Aramid Fiber Case")).toHaveCount(0);
    expect(await items(page).count()).toBeLessThan(all);
  });

  test("search narrows results, then shows a no-results state", async ({
    page,
  }) => {
    await page.goto("/#catalog");
    const search = page.getByRole("searchbox", { name: "Search products" });

    await search.fill("power bank");
    await expect(page.getByText("10000mAh Power Bank")).toBeVisible();
    await expect(page.getByText("Aramid Fiber Case")).toHaveCount(0);

    await search.fill("zzz nothing here");
    await expect(
      page.getByText("No products match those filters."),
    ).toBeVisible();
  });

  test("clear filters restores the full grid", async ({ page }) => {
    await page.goto("/#catalog");
    const all = await items(page).count();

    await page.getByRole("button", { name: "Cases", exact: true }).click();
    expect(await items(page).count()).toBeLessThan(all);

    await page
      .getByRole("button", { name: /clear filters/i })
      .first()
      .click();
    expect(await items(page).count()).toBe(all);
  });

  test("result count reflects the active filter", async ({ page }) => {
    await page.goto("/#catalog");
    await page.getByRole("button", { name: "Earbuds", exact: true }).click();
    // "Showing N of 20" — N should be the small earbuds count.
    await expect(page.getByText(/Showing\s+\d+\s+of\s+\d+/)).toBeVisible();
    await expect(page.getByText("TWS Earbuds Pro")).toBeVisible();
  });
});
