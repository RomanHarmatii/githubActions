import test, { expect } from "@playwright/test";
import { HomePage } from "../Helpers/Page Objects/HomePage";
import { GaragePage } from "../Helpers/Page Objects/GaragePage";
import { ProfilePage } from "../Helpers/Page Objects/ProfilePage";
import LoginModal from "../Helpers/Modals/LoginModal";

test.describe("Profile", () => {
  test("shows mocked profile name", async ({ page }) => {
    await page.route("/api/users/profile", async (route) => {
      const response = await route.fetch();
      const json = await response.json();
      json.data.name = "Hello";
      await route.fulfill({ response, json });
    });

    const homePage = new HomePage(page);
    const loginModal = new LoginModal(page);
    const garagePage = new GaragePage(page);
    const profilePage = new ProfilePage(page);

    await homePage.navigate();
    await homePage.header.signInButton.click();
    await loginModal.login("dfgdfgdfgretrwt@gmail.com", "Qwerty1!");
    await garagePage.header.openProfilePage();

    await expect(profilePage.profileName._element).toContainText("Hello");
  });
});
