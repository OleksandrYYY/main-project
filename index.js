import { requestFetchCountries } from "./countries/requestFetchCountries.js";
import { getListYears } from "./countries/getListYears.js";

(async () => {
    await requestFetchCountries();
    getListYears();
})();

// document.addEventListener("DOMContentLoaded", async () => {
//     await requestFetchCountries();
//     getListYears();
// })