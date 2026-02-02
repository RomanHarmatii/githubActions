import { test as base } from "@playwright/test";
import { GaragePage } from "../Page Objects/GaragePage";

export const test = base.extend({
  garagePage: async ({ page }, use) => {
    const garagePage = new GaragePage(page);
    await garagePage.openGarage();
    await use(garagePage);
  },
});

export { expect } from "@playwright/test";
