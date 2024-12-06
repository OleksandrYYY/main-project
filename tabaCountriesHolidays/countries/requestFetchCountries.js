import { getListCountries } from "../countries/getListCountries.js";

export async function requestFetchCountries(getDataCountries, countrySelect, yearSelect) {
    try {
        const countries = await getDataCountries();
        getListCountries(countries.response.countries, countrySelect, yearSelect);
    } catch (error) {
        console.error("Помилка при отриманні списку країн:", error);
        throw new Error("Помилка при отриманні списку країн:", error);
    }
};
