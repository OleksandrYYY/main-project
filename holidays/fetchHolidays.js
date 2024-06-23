import { getResHolidays } from "./getResHolidays.js";

export async function fetchHolidays(getDataHolidays, countrySelect, yearSelect, holidaysList) {
    const getCountry = countrySelect.value;
    const getYear = yearSelect.value;

    if( getCountry && getYear) {
        try {
            // const holidays = await getDataHolidays(getCountry, getYear);
            // getResHolidays(holidays.response.holidays, tableHolidays);
            const holidays = await getDataHolidays(getCountry, getYear);
            holidaysList.length = 0;  // Очистити масив
            holidaysList.push(...holidays.response.holidays);  // Додати нові свята
            getResHolidays(holidaysList, document.querySelector("#result-table-holidays tbody"));
        } catch (error) {
            throw new Error("Помилка при отриманні списку свят:", error);   
        }
    }
}