import { test, expect } from "@playwright/test";

test.describe("catalog", () => {
  test("renders a grid of products with prices and honest stock", async ({
    page,
  }) => {
    await page.goto("/#catalog");

    const items = page.getByRole("list", { name: "Products" }).getByRole("listitem");
    await expect(items.first()).toBeVisible();
    expect(await items.count()).toBeGreaterThanOrEqual(12);

    // ₹ prices and a stock string are present.
    await expect(page.getByText("₹1,499").first()).toBeVisible();
    await expect(page.getByText(/in store|Only \d+ left|Out of stock/).first()).toBeVisible();
  });

  test("out-of-stock items cannot be reserved", async ({ page }) => {
    await page.goto("/#catalog");
    const soldOut = page.getByRole("button", { name: "Sold out" });
    const count = await soldOut.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(soldOut.nth(i)).toBeDisabled();
    }
  });

  test("product detail dialog opens and closes", async ({ page }) => {
    await page.goto("/#catalog");

    await page.getByRole("button", { name: "Details" }).first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("heading")).toBeVisible();

    await dialog.getByRole("button", { name: "Close" }).click();
    await expect(dialog).not.toBeVisible();
  });

  test("dialog reserve button is disabled for an out-of-stock item", async ({
    page,
  }) => {
    await page.goto("/#catalog");
    const card = page
      .getByRole("listitem")
      .filter({ hasText: "Rugged Armor Case" });
    await card.getByRole("button", { name: "Details" }).click();

    const dialog = page.getByRole("dialog");
    await expect(dialog.getByRole("button", { name: "Out of stock" })).toBeDisabled();
  });
});
