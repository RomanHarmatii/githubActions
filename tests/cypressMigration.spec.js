import test, { expect } from "@playwright/test";
import { HomePage } from "../Helpers/Page Objects/HomePage";

test.describe("Sign in and profile", () => {
  test.beforeEach(async ({ request }) => {
    await request.post("/api/auth/signin", {
      data: {
        email: "dfgdfgdfgretrwt@gmail.com",
        password: "Qwerty1!",
        remember: false,
      },
    });
  });

  test("displays mocked profile name after login", async ({ page }) => {
    const homePage = new HomePage(page);

    await page.route("/api/users/profile", async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      json.data.name = "Hello";
      await route.fulfill({ response, json });
    });

    await homePage.navigate();
    await homePage.login("dfgdfgdfgretrwt@gmail.com", "Qwerty1!");
    await homePage.userMenu.dropdownTrigger.click();
    await homePage.userMenu.profileLink.click();

    await expect(homePage.profileName.locator).toContainText("Hello");
  });
});
