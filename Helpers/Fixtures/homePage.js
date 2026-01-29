import { test as base } from "@playwright/test";
import { HomePage } from "../Page Objects/HomePage";
import { GetPage } from "../Page Objects/GetPage";

export const test = base.extend({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    console.log("Test is starting");
    await homePage.navigate();
    await homePage.listButton("get").click();
    use(homePage);
    await page.waitForTimeout(1000);
    console.log("Test is ending");
  },
});
