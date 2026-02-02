import test, { expect } from "@playwright/test";

test.describe("User Profile Name Modification via API Mocking", () => {
  let token;

  test.beforeEach(async ({ request, browser }) => {
    // Authenticate user via API
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("/");

    const response = await request.post("/api/auth/signin", {
      data: {
        email: "dfgdfgdfgretrwt@gmail.com",
        password: "Qwerty1!",
        remember: false,
      },
    });

    // Extract authentication token from response headers
    token = response.headers()["set-cookie"].split(";")[0];
  });

  test("should display mocked profile name when API response is intercepted", async ({
    page,
    request,
  }) => {
    // Setup API mocking - intercept requests to /api/users/profile
    await page.route("/api/users/profile", async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      // Mock response to change name to "Hello"
      json.data.name = "Hello";
      await route.fulfill({ response, json });
    });

    // Navigate to application
    await page.goto("/");

    // Perform user sign-in
    await page.locator('[class="btn btn-outline-white header_signin"]').click();
    await page.locator("#signinEmail").fill("dfgdfgdfgretrwt@gmail.com");
    await page.locator("#signinPassword").fill("Qwerty1!");
    await page.locator('[class="btn btn-primary"]').click();

    // Navigate to user profile
    await page.locator("#userNavDropdown").click();
    await page.locator('[class^="dropdown-item"]').getByText("Profile").click();

    // Verify mocked data display
    await expect(page.locator("[class^='profile_name']")).toContainText(
      "Hello",
    );
  });
});
