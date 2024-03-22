import { test, expect } from "@playwright/test";
import { GoogleMapsMain } from "../pages/google-maps-main";

test.describe("Google Maps tests", () => {
  const searchValues = ['Paris', 'London'];
  interface CityNames {
    [engName: string]: string;
  };
  const cityNames: CityNames = {
    "Warsaw": "Warszawa",
    "Vienna": "Wien",
};

  test.beforeEach("Prepare page for testing", async ({ page }) => {
    const maps = new GoogleMapsMain(page);
    await maps.goto();
    await maps.acceptTnC();
  });

  for (const searchValue of searchValues) {
    test(`${searchValue} heading is visible after search`, async ({ page }) => {
      const maps = new GoogleMapsMain(page);
      await maps.search(searchValue);

      const resultHeading = await maps.getResultHeading(searchValue);
      await expect(resultHeading).toBeVisible();
    });
  }

  test("After clicking directions the destination is pre-filled with search result", async ({ page }) => {
    const searchText = "London";
    const maps = new GoogleMapsMain(page);
    await maps.search(searchText);

    await expect(maps.directionsButton).toBeVisible();
    await maps.directionsButton.click();

    await expect(maps.directionsOmnibox).toBeVisible();
    const directionsSearchboxToText = await maps.directionsSearchboxTo.inputValue();
    expect(directionsSearchboxToText).toContain(searchText);
  });

  for (const engName in cityNames) {
    test(`Translations - ${engName} heading is visible after searching ${cityNames[engName]}`, async ({ page }) => {
      const maps = new GoogleMapsMain(page);
      await maps.search(cityNames[engName]);

      const resultHeading = await maps.getResultHeading(engName);
      await expect(resultHeading).toBeVisible();
    });
}
});
