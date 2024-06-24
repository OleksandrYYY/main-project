import { getResHolidays } from "./getResHolidays.js";

export async function fetchHolidays(getDataHolidays, countrySelect, yearSelect, holidaysList, tableHolidays) {
    const getCountry = countrySelect.value;
    const getYear = yearSelect.value;

    if( getCountry && getYear) {
        try {
            const holidays = await getDataHolidays(getCountry, getYear);
            holidaysList.length = 0;
            holidaysList.push(...holidays.response.holidays);
            getResHolidays(holidaysList, tableHolidays);
        } catch (error) {
            throw new Error("Помилка при отриманні списку свят:", error);   
        }
    }
}