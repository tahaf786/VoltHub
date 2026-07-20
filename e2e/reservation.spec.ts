import { test, expect } from "@playwright/test";

const reserveFirst = (page: import("@playwright/test").Page) =>
  page.getByRole("button", { name: "Reserve", exact: true }).first().click();

test.describe("reservation", () => {
  test("reserving adds the item and badges the cart", async ({ page }) => {
    await page.goto("/#catalog");
    await reserveFirst(page);

    await expect(
      page.getByRole("link", { name: /Reservation, 1 item/ }),
    ).toBeVisible();

    const list = page.getByRole("list", { name: "Reservation items" });
    await expect(list.getByRole("listitem")).toHaveCount(1);
  });

  test("quantity and remove update the reservation", async ({ page }) => {
    await page.goto("/#catalog");
    await reserveFirst(page);

    const list = page.getByRole("list", { name: "Reservation items" });
    await list.getByRole("button", { name: "Increase quantity" }).click();
    await expect(page.getByText("2 items")).toBeVisible();

    await list.getByRole("button", { name: /Remove/ }).click();
    await expect(page.getByText("Your reservation is empty.")).toBeVisible();
  });

  test("the form validates, then issues a pickup code", async ({ page }) => {
    await page.goto("/#catalog");
    await reserveFirst(page);

    // Submitting empty shows inline errors, no code.
    await page.getByRole("button", { name: "Get pickup code" }).click();
    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(page.getByText("Enter a 10-digit mobile number.")).toBeVisible();
    await expect(page.getByTestId("pickup-code")).toHaveCount(0);

    // Valid details issue a code.
    await page.getByLabel("Your name").fill("Priya Sharma");
    await page.getByLabel("Phone number").fill("9876543210");
    await page.getByRole("button", { name: "Get pickup code" }).click();

    await expect(page.getByTestId("pickup-code")).toHaveText(/^VH-[A-Z0-9]{5}$/);
    await expect(
      page.getByRole("heading", { name: "Reserved for pickup" }),
    ).toBeVisible();
  });

  test("the reservation persists across a reload", async ({ page }) => {
    await page.goto("/#catalog");
    await reserveFirst(page);
    await expect(
      page.getByRole("link", { name: /Reservation, 1 item/ }),
    ).toBeVisible();

    await page.reload();
    await expect(
      page.getByRole("link", { name: /Reservation, 1 item/ }),
    ).toBeVisible();
  });
});
