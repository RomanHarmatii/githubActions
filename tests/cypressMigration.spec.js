import test, { expect } from "@playwright/test";

test.describe("Test", () => {
  let token;
  test.beforeEach(async ({ request, browser }) => {
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
    token = response.headers()["set-cookie"].split(";")[0];
    // console.log("TOKEN:", token);
    // await context.addCookies[
    //   {
    //     name: "sid",
    //     value: token,
    //   }
    // ];
    // await page.goto("/panel/garage");
    // await page.locator("[class='btn btn-primary']").click();
  });
  test("Test", async ({ page, request }) => {
    // await request.post("/api/cars", {
    //   headers: {
    //     Cookie: token,
    //   },
    //   data: {
    //     carBrandId: 1,
    //     carModelId: 1,
    //     mileage: 122,
    //   },
    // });
    // const response = await request.get("/api/cars", {
    //   headers: {
    //     Cookie: token,
    //   },
    // });
    // const cars = await response.json();
    // const carIds = cars.data.map((car) => {
    //   return car.id;
    // });
    // // await request.delete(`/api/cars/474915`, {
    // //   headers: {
    // //     Cookie: token,
    // //   },
    // // });
    // for (const id of carIds) {
    //   await request.delete(`/api/cars/${id}`, {
    //     headers: {
    //       Cookie: token,
    //     },
    //   });
    // }
    // console.log(carIds);
    // console.log(carIds);
    await page.route("/api/users/profile", async (route, request) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          status: "ok",
          data: {
            userId: 323500,
            photoFilename: "default-user.png",
            name: "My Test Name",
            lastName: "My Test Last Name",
          },
        }),
      });
    });

    await page.goto("/");
    await page.locator('[class="btn btn-outline-white header_signin"]').click();
    await page.locator("#signinEmail").fill("dfgdfgdfgretrwt@gmail.com");
    await page.locator("#signinPassword").fill("Qwerty1!");
    await page.locator('[class="btn btn-primary"]').click();
    await page.locator("#userNavDropdown").click();
    await page.locator('[class^="dropdown-item"]').getByText("Profile").click();

    await expect(page.locator("[class^='profile_name']")).toContainText(
      "My Test Name My Test Last Name",
    );
  });
});
