// spec: specs/add-car.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "../../Helpers/Fixtures/garagePage";

test.describe("Garage — Add Car", () => {
  test("Add car — happy path and persistence", async ({ garagePage, page }) => {
    // Navigate to BASE_URL then open Garage (side nav link 'Garage').
    await garagePage.expectGaragePageLoaded();

    // Click 'Add car'.
    await garagePage.clickAddCar();
    await garagePage.expectAddCarModalVisible();

    // In 'Add a car' modal, keep defaults Brand='Audi', Model='TT'. Enter Mileage='12345'.
    await garagePage.fillMileage("12345");
    await garagePage.expectAddButtonEnabled();

    // Click 'Add'.
    await garagePage.submitAddCar();
    await garagePage.expectCarVisible("Audi TT");
    await garagePage.expectMileageValue("12345");

    // Reload the Garage page.
    await page.reload();
    await garagePage.expectCarVisible("Audi TT");
    await garagePage.expectMileageValue("12345");

    // Cleanup: Open the car actions (edit), click 'Remove car', confirm 'Remove'.
    await garagePage.openCarActions();
    await garagePage.removeCar();
  });
});
