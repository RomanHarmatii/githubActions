// spec: specs/add-car.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from "../../Helpers/Fixtures/garagePage";

test.describe("Garage — Add Car", () => {
  test("Add car — input validation (mileage)", async ({ garagePage }) => {
    // Open Garage, click 'Add car' to open modal.
    await garagePage.clickAddCar();
    await garagePage.expectAddCarModalVisible();

    // Leave Mileage empty.
    await garagePage.expectAddButtonDisabled();

    // Type non-numeric characters into Mileage (e.g., 'abc' or '12a').
    await garagePage.typeNonNumericMileage("abc");
    await garagePage.expectAddButtonDisabled();
    await expect(garagePage.mileageInput).toHaveValue("");

    // Enter a negative value (e.g., '-1').
    await garagePage.fillMileage("-1");
    await garagePage.expectAddButtonDisabled();

    // Enter an excessively large value (e.g., '9999999999999999').
    await garagePage.fillMileage("9999999999999999");
    await garagePage.expectAddButtonDisabled();

    // Enter a boundary value (e.g., '0' for a brand-new car).
    await garagePage.fillMileage("0");
    await garagePage.expectAddButtonEnabled();

    // Click 'Cancel' to close modal.
    await garagePage.cancelAddCar();
    await garagePage.expectAddCarModalNotVisible();
  });
});
