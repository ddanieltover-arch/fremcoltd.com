import { expect, test } from "@playwright/test";

test.describe("smoke", () => {
  test("home page loads brand and catalog signals", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/FREEM ENTERPRISE/i);
    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Featured Products" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Request a Quote/i }).first()).toBeVisible();
  });

  test("product page renders catalog detail", async ({ page }) => {
    await page.goto("/product/icumsa-45-white-refined-sugar");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(/ICUMSA[- ]?45/i);
    await expect(page.getByRole("link", { name: /Request a Quote/i }).first()).toBeVisible();
    await expect(page.getByText(/FREEM ENTERPRISE/i).first()).toBeVisible();
  });

  test("quote form submits successfully", async ({ page }) => {
    await page.goto("/request-a-quote");

    await expect(page.getByRole("heading", { name: "Request a Quote" })).toBeVisible();

    const form = page.locator("main form").first();
    await form.waitFor({ state: "visible" });

    // Timing honeypot requires ~2s since mount.
    await page.waitForTimeout(2_500);

    await form.locator('input[name="name"]').fill("Pulse Smoke Tester");
    await form.locator('input[name="email"]').fill("smoke.quote@fremcoltd.com");
    await form.locator('input[name="company"]').fill("Pulse Software Studio");
    await form.locator('select[name="productCategory"]').selectOption("sugar");
    await form.locator('input[name="quantity"]').fill("25 MT");
    await form.locator('input[name="destination"]').fill("Singapore");
    await form.locator('textarea[name="message"]').fill("Playwright smoke test — safe to ignore.");

    // Leave honeypot empty; assert real fields before submit.
    await expect(form.locator('input[name="website"]')).toHaveValue("");
    await expect(form.locator('input[name="name"]')).toHaveValue("Pulse Smoke Tester");
    await expect(form.locator('input[name="email"]')).toHaveValue("smoke.quote@fremcoltd.com");

    await form.getByRole("button", { name: "Submit Quote Request" }).click();

    const success = page.getByText(/Quote request received/i);
    const error = page.locator("main p.text-red-600");
    await expect(success.or(error)).toBeVisible({ timeout: 20_000 });

    if (await error.isVisible()) {
      throw new Error(`Quote submit failed: ${await error.textContent()}`);
    }

    await expect(success).toBeVisible();
  });
});
