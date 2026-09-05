import { test, expect } from "@playwright/test";
test("scenario arithmetic, edit, reset and horizon exclusions", async ({
  page,
}) => {
  await page.goto("/bottom-up");
  await expect(page.getByTestId("gross-total")).toHaveText("₹3,965 Cr");
  await expect(page.getByTestId("weighted-total")).toHaveText("₹958 Cr");
  await page.getByRole("button", { name: "Conservative", exact: true }).click();
  await expect(page.getByTestId("weighted-total")).toHaveText("₹277 Cr");
  await page.getByRole("button", { name: "Upside", exact: true }).click();
  await expect(page.getByTestId("weighted-total")).toHaveText("₹2,555 Cr");
  await page.getByRole("button", { name: "Base", exact: true }).click();
  await page
    .getByRole("button", { name: "18-month view", exact: true })
    .click();
  await expect(page.getByTestId("weighted-total")).toHaveText("₹432 Cr");
  await page
    .getByRole("button", { name: "Edit assumptions", exact: true })
    .click();
  await page
    .getByRole("spinbutton", {
      name: "System-package ASP · V-BAT · end-customer programme",
      exact: true,
    })
    .fill("40");
  await expect(page.getByTestId("weighted-total")).toHaveText("₹576 Cr");
  await page.getByRole("button", { name: "Reset base defaults" }).click();
  await expect(page.getByTestId("weighted-total")).toHaveText("₹432 Cr");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("filters sync graph, table, radar and survive deep-link reload", async ({
  page,
}) => {
  await page.goto("/bottom-up");
  await page
    .getByLabel("Filter Product", { exact: true })
    .selectOption("V-BAT");
  await page.getByLabel("Filter Buyer", { exact: true }).selectOption("Navy");
  await expect(page.locator(".s-result-count")).toHaveText(
    "1 / 24 opportunity cells",
  );
  await expect(page.locator(".react-flow__node")).toHaveCount(5);
  await page
    .getByRole("tab", { name: "Opportunity cells", exact: true })
    .click();
  await expect(page.locator(".s-table tbody tr").first()).toContainText(
    "Naval Shipborne UAS",
  );
  await expect(
    page
      .getByRole("table", { name: "Filtered opportunity cells" })
      .locator("tbody tr"),
  ).toHaveCount(1);
  await page.reload();
  await expect(page.getByLabel("Filter Buyer", { exact: true })).toHaveValue(
    "Navy",
  );
  await page.getByRole("tab", { name: "Account radar", exact: true }).click();
  await expect(page.locator(".s-radar-list button")).toHaveCount(1);
  await page.locator(".s-radar-list button").click();
  await expect(
    page.getByRole("dialog", { name: "Naval Shipborne UAS", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("dialog").getByText("Four centres of decision power"),
  ).toBeVisible();
});
test("graph selection, keyboard source popover and nested modal escape", async ({
  page,
}) => {
  await page.goto("/bottom-up?product=V-BAT&buyer=Army");
  const product = page.locator(".s-path-main").first();
  await product.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".s-map-brief")).toContainText(
    "Army V-BAT expansion",
  );
  await page.locator(".s-path-main").nth(1).click();
  await expect(
    page.getByRole("dialog", { name: "Army V-BAT expansion", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("dialog")
    .getByRole("button", {
      name: "Source: Indian Army selects V-BAT and Hivemind",
      exact: true,
    })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toHaveCount(2);
  const link = page
    .getByRole("dialog", { name: "Evidence file" })
    .getByRole("link", { name: "Open original source" });
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("href", /shield.ai/);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(1);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("sorting and editing priority propagates to table", async ({ page }) => {
  await page.goto("/bottom-up?view=table&cell=01&open=1");
  const dialog = page.getByRole("dialog", {
    name: "Army V-BAT expansion",
    exact: true,
  });
  await dialog
    .getByText("Edit this opportunity’s priority ratings", { exact: false })
    .click();
  await dialog
    .getByRole("slider", { name: "Mission fit", exact: true })
    .fill("1");
  await expect(dialog).toContainText("Priority 76/100");
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("table", { name: "Filtered opportunity cells" }),
  ).toContainText("76");
  await page.getByRole("button", { name: "Gross layer", exact: false }).click();
});
test("story mode covers every stage and shared model persists across routes", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Story mode", exact: true }).click();
  await expect(page).toHaveURL(/top-down/);
  for (let i = 0; i < 8; i++) {
    await page.getByRole("button", { name: "Next", exact: true }).click();
  }
  await expect(page).toHaveURL(/goals/);
  await page.getByRole("button", { name: "Finish", exact: true }).click();
  await expect(
    page.getByRole("region", { name: "Story mode walkthrough" }),
  ).toHaveCount(0);
  await page
    .getByRole("link", { name: "Bottom-up", exact: false })
    .first()
    .click();
  await page.getByRole("button", { name: "Conservative", exact: true }).click();
  await page
    .getByRole("link", { name: "Top-down", exact: false })
    .first()
    .click();
  await expect(page.getByTestId("weighted-total")).toHaveText("₹277 Cr");
});
test("all routes render without runtime errors and mobile has no page overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/bottom-up",
      "/bottom-up?view=table",
      "/bottom-up?view=radar",
      "/bottom-up?view=power",
      "/bottom-up?view=accounts",
      "/top-down",
      "/roadmap",
      "/operating-model",
      "/md-dashboard",
      "/cadence",
      "/goals",
      "/sources",
    ]) {
      await page.goto(route);
      await expect(page.locator("h1").first()).toBeVisible();
      await expect
        .poll(() =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
        )
        .toBeTruthy();
    }
  }
  expect(errors).toEqual([]);
});
