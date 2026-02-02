import Button from "../Elements/Button";

export default class {
  constructor(page) {
    this.page = page;
  }
  get dropdownTrigger() {
    return new Button({ page: this.page, selector: "#userNavDropdown" });
  }
  get profileLink() {
    return new Button({ page: this.page, text: "Profile" });
  }
}
