import { CalendarAPI } from "../CalendarAPI.js";
import { getListCountries } from "../countries/getListCountries.js";

export async function requestFetchCountries(countrySelect, yearSelect) {
    try {
        const calendarApi = new CalendarAPI();
        const countries = await calendarApi.getDataCountries();
        getListCountries(countries.response.countries, countrySelect, yearSelect);
    } catch (error) {
        console.error("Помилка при отриманні списку країн:", error);
        throw new Error("Помилка при отриманні списку країн:", error);
    }
}