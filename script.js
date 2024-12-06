"use strict";

import { CalendarAPI } from "./CalendarAPI.js";
import { showTab } from "./showTab.js";
import { requestFetchCountries } from "./tabaCountriesHolidays/countries/requestFetchCountries.js";
import { getListYears } from "./tabaCountriesHolidays/countries/getListYears.js";
import { fetchHolidays } from "./tabaCountriesHolidays/holidays/fetchHolidays.js";
import { getResHolidays } from "./tabaCountriesHolidays/holidays/getResHolidays.js";
import { sortHolidays } from "./tabaCountriesHolidays/holidays/sortHolidays.js";
import { calculateDates } from "./tabaDates/calculateDates.js";
import { getUpdateResult } from "./tabaDates/getUpdateResult.js";

const calendarApi = new CalendarAPI();
const getDataCountries = calendarApi.getDataCountries.bind(calendarApi);
const getDataHolidays = calendarApi.getDataHolidays.bind(calendarApi);


document.addEventListener("DOMContentLoaded", () => {
    const tabButtonDate = document.querySelector("#tab-button-date");
    const tabButtonHolidays = document.querySelector("#tab-button-holidays");

    const startDateInput = document.querySelector("#start-date");
    const endDateInput = document.querySelector("#end-date");

    const form = document.querySelector(".create-form-date");
    const getCalculateResult = document.querySelector(".calculate-result");

    const tableDates = document.querySelector("#result-table-date tbody");
    const tableHolidays = document.querySelector("#result-table-holidays tbody");

    const yearSelect = document.querySelector("#year-select");
    const countrySelect = document.querySelector("#country-select");

    const sortHolidaysButton = document.querySelector("#sort-holidays-button");
    let holidaysList = [];
    let sortOrder = "ascend";

    tabButtonDate.addEventListener("click", () => showTab("tab-dates"));
    tabButtonHolidays.addEventListener("click", async () => {
        showTab("tab-holidays");
        await requestFetchCountries(getDataCountries, countrySelect, yearSelect);
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const getInputDate = document.querySelector(".input-date");

        if (getInputDate.value.trim() === "") {
            getInputDate.value = "";
            return;
        }
    });

    startDateInput.addEventListener("change", () => {
        endDateInput.min = startDateInput.value;
    });

    endDateInput.addEventListener("change", () => {
        startDateInput.max = endDateInput.value;
    });

    const holidaysParams = {
        getDataHolidays,
        countrySelect,
        yearSelect,
        holidaysList,
        tableHolidays
    };

    (async () => {
        await requestFetchCountries(getDataCountries, countrySelect, yearSelect);
        getListYears(yearSelect);

        await fetchHolidays(holidaysParams);
        getResHolidays(holidaysList, tableHolidays);
    })();

    sortHolidaysButton.addEventListener("click", () => {
        sortOrder = sortHolidays(holidaysList, sortOrder, tableHolidays)
    });

    countrySelect.addEventListener("change", async () => {
        await fetchHolidays(holidaysParams)
    });
    yearSelect.addEventListener("change", async () => {
        await fetchHolidays(holidaysParams)
    });

    // getCalculateResult.addEventListener("click", () => calculateDates(tableDates));
    getCalculateResult.addEventListener("click", () => {
        const getTableDates = document.querySelector("#result-table-date");
        getTableDates.style.display = "table";
        calculateDates(tableDates);
    });
    getUpdateResult(tableDates);
});
