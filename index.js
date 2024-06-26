import {requestFetchCountries} from "./tabaCountriesHolidays/countries/requestFetchCountries.js";
import {getListYears} from "./tabaCountriesHolidays/countries/getListYears.js";

(async () => {
    await requestFetchCountries();
    getListYears();
})();
