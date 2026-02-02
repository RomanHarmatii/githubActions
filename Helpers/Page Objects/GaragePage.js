import { BasePage } from "./BasePage";
import AuthenticatedHeader from "../Components/AuthenticatedHeader";
import { expect } from "@playwright/test";

const url = "/panel/garage";

export class GaragePage extends BasePage {
  constructor(page) {
    super(page, url);
    this.page = page;
    this.header = new AuthenticatedHeader(this.page);
  }

  // Locators
  get addCarButton() {
    return this.page.getByRole("button", { name: "Add car" });
  }

  get garageHeading() {
    return this.page.getByRole("heading", { name: "Garage" });
  }

  get emptyStateMessage() {
    return this.page.getByText("You don't have any cars in your garage");
  }

  // Modal elements
  get addCarModalHeading() {
    return this.page.getByRole("heading", { name: "Add a car" });
  }

  get brandSelect() {
    return this.page.getByRole("combobox", { name: "Brand" });
  }

  get modelSelect() {
    return this.page.getByRole("combobox", { name: "Model" });
  }

  get mileageInput() {
    return this.page.getByRole("spinbutton", { name: "Mileage" });
  }

  get addButton() {
    return this.page.getByRole("button", { name: "Add" });
  }

  get cancelButton() {
    return this.page.getByRole("button", { name: "Cancel" });
  }

  get removeCarButton() {
    return this.page.getByRole("button", { name: "Remove car" });
  }

  get confirmRemoveButton() {
    return this.page.getByRole("button", { name: "Remove" });
  }

  // Car card elements
  carTitle(name) {
    return this.page.getByText(name);
  }

  get firstCarMileage() {
    return this.page.getByRole("spinbutton").first();
  }

  get carActionsButton() {
    return this.page.getByRole("button").filter({ hasText: /^$/ });
  }

  // Actions
  async openGarage() {
    await this.page.getByRole("link", { name: " Garage" }).click();
  }

  async clickAddCar() {
    await this.addCarButton.click();
  }

  async fillMileage(mileage) {
    await this.mileageInput.fill(mileage);
  }

  async typeNonNumericMileage(text) {
    await this.mileageInput.pressSequentially(text);
  }

  async submitAddCar() {
    await this.addButton.click();
  }

  async cancelAddCar() {
    await this.cancelButton.click();
  }

  async addCar({ brand = "Audi", model = "TT", mileage }) {
    await this.clickAddCar();
    if (brand !== "Audi") {
      await this.brandSelect.selectOption(brand);
    }
    if (model !== "TT") {
      await this.modelSelect.selectOption(model);
    }
    await this.fillMileage(mileage);
    await this.submitAddCar();
  }

  async openCarActions() {
    await this.carActionsButton.click();
  }

  async removeCar() {
    await this.removeCarButton.click();
    await this.confirmRemoveButton.click();
  }

  // Assertions
  async expectGaragePageLoaded() {
    await expect(this.garageHeading).toBeVisible();
  }

  async expectAddCarModalVisible() {
    await expect(this.addCarModalHeading).toBeVisible();
  }

  async expectAddCarModalNotVisible() {
    await expect(this.addCarModalHeading).not.toBeVisible();
  }

  async expectCarVisible(name) {
    await expect(this.carTitle(name)).toBeVisible();
  }

  async expectMileageValue(value) {
    await expect(this.firstCarMileage).toHaveValue(value);
  }

  async expectAddButtonEnabled() {
    await expect(this.addButton).toBeEnabled();
  }

  async expectAddButtonDisabled() {
    await expect(this.addButton).toBeDisabled();
  }

  async expectEmptyState() {
    await expect(this.emptyStateMessage).toBeVisible();
  }
}
