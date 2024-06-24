"use strict";

import { CalendarAPI } from "./CalendarAPI.js";
import { showTab } from "./showTab.js";
import { requestFetchCountries } from "./countries/requestFetchCountries.js";
import { getListYears } from "./countries/getListYears.js";
import { fetchHolidays } from "./holidays/fetchHolidays.js";
import { getResHolidays } from "./holidays/getResHolidays.js";
import { sortHolidays } from "./holidays/sortHolidays.js";

const calendarApi = new CalendarAPI();
const getDataCountries = calendarApi.getDataCountries.bind(calendarApi);
const getDataHolidays = calendarApi.getDataHolidays.bind(calendarApi);
console.log(getDataHolidays);


document.addEventListener("DOMContentLoaded", async () => {
    const tabButtonDate = document.querySelector("#tab-button-date");
    const tabButtonHolidays = document.querySelector("#tab-button-holidays");

    const startDateInput = document.querySelector("#start-date");
    const endDateInput = document.querySelector("#end-date");

    const getForm = document.querySelector(".create-form-date");
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

    getForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // const getInputDate = document.querySelector(".input-date");

        // if (getInputDate.value.trim() === "") {
        //     getInputDate.value = "";
        //     return;
        // }
    });

    startDateInput.addEventListener("change", () => {
        endDateInput.min = startDateInput.value;
    });

    endDateInput.addEventListener("change", () => {
        startDateInput.max = endDateInput.value;
    });

    await requestFetchCountries(getDataCountries, countrySelect, yearSelect);
    getListYears(yearSelect);

    await fetchHolidays(getDataHolidays, countrySelect, yearSelect, holidaysList, tableHolidays);
    getResHolidays(holidaysList, tableHolidays);


    function calculateDates() {
        const startDate = document.querySelector("#start-date").value;
        let endDate = document.querySelector("#end-date").value;
        const additionalParameterElem = document.querySelector("input[name='additional-parameters']:checked");
        const getCountDataElem = document.querySelector("input[name='count-data']:checked");
        const additionalParameter = additionalParameterElem.value;
        const getCountData = getCountDataElem.value;
        const preset = document.querySelector("#preset").value;


        if (!startDate) {
            alert("Будь ласка, введіть початкову дату.");
            return;
        }

        if (!additionalParameterElem) {
            alert("Будь ласка, виберіть додатковий параметр.");
            return;
        }
    
        if (!getCountDataElem) {
            alert("Будь ласка, виберіть одиниці підрахунку.");
            return;
        }

        let getStartDate = new Date(startDate);
        let getEndDate;

        if (preset) {
            getEndDate = new Date(getStartDate);
            if (preset === "week") {
                getEndDate.setDate(getStartDate.getDate() + 7);
            } else if (preset === "month") {
                getEndDate.setDate(getStartDate.getDate() + 30);
            }  
        } else if (endDate) {
            getEndDate = new Date(endDate);
        } else {
            alert("Будь ласка, введіть кінцеву дату або оберіть пресет.");
            return;
        }



        let differenceDate = 0;

        switch (additionalParameter) {
            case "work-days":
            case "weekends":
                let workDays = 0;
                let weekends = 0;
                for (let date = getStartDate; date <= getEndDate; date.setDate(date.getDate() + 1)) {
                    const dayOfWeek = date.getDay();
                    if (dayOfWeek === 0 || dayOfWeek === 6) {
                        weekends++;
                    } else {
                        workDays++;
                    }
                }
                differenceDate = additionalParameter === "work-days" ? workDays : weekends;
                break;
            case "all-days":
                differenceDate = (getEndDate - getStartDate) / (1000 * 60 * 60 * 24);
                break;
            default:
                alert("Невірні параметри!");
                return;
        }

        let resultDifferenceCountUnits;
        switch (getCountData) {
            case "count-days":
                resultDifferenceCountUnits = `Проміжок між датами: ${differenceDate} днів`;
                break;
            case "count-hours":
                resultDifferenceCountUnits = `Проміжок між датами: ${differenceDate * 24} годин`;
                break;
            case "count-minutes":
                resultDifferenceCountUnits = `Проміжок між датами: ${differenceDate * 24 * 60} хвилин`;
                break;
            case "count-seconds":
                resultDifferenceCountUnits = `Проміжок між датами: ${differenceDate * 24 * 60 * 60} секунд`;
                break;
            default:
                alert("Такого параметру не існує!");
                return;
        }

        getSaveResult(getStartDate, getEndDate, resultDifferenceCountUnits);
        getUpdateResult();

        document.getElementById("result").innerText = resultDifferenceCountUnits;
    }

    const dataDate = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    function changedFormatDate(date) {
        return date.toLocaleString("uk-UA", dataDate).replace(",", "");
    }

    function getSaveResult(startDate, endDate, res) {
        let resultDate = JSON.parse(localStorage.getItem("resultDates")) || [];
        const timeIsNow = new Date();
        startDate.setHours(timeIsNow.getHours(), timeIsNow.getMinutes(), timeIsNow.getSeconds());
        if (endDate) {
            endDate.setHours(timeIsNow.getHours(), timeIsNow.getMinutes(), timeIsNow.getSeconds());
        }
        const getChangedStartDate = changedFormatDate(startDate);
        const getChangedEndDate = changedFormatDate(endDate);
        resultDate.push({ startDate: getChangedStartDate, endDate: getChangedEndDate, res });

        if (resultDate.length > 10) {
            resultDate.shift();
        }
        localStorage.setItem("resultDates", JSON.stringify(resultDate));
    }

    function getUpdateResult() {
        let resultDate = JSON.parse(localStorage.getItem("resultDates")) || [];
        tableDates.innerHTML = "";

        resultDate.forEach(({ startDate, endDate, res }) => {
            const rowElem = document.createElement("tr");

            const startDateColumn = document.createElement("td");
            startDateColumn.textContent = startDate;
            rowElem.appendChild(startDateColumn);

            const endDateColumn = document.createElement("td");
            endDateColumn.textContent = endDate;
            rowElem.appendChild(endDateColumn);

            const resDateColumn = document.createElement("td");
            resDateColumn.textContent = res;
            rowElem.appendChild(resDateColumn);

            tableDates.appendChild(rowElem);
        });
    }


    sortHolidaysButton.addEventListener("click", () => {
        sortOrder = sortHolidays(holidaysList, sortOrder, tableHolidays)
    });

    getCalculateResult.addEventListener("click", calculateDates);
    getUpdateResult();

    countrySelect.addEventListener("change", () => {
        fetchHolidays(getDataHolidays, countrySelect, yearSelect, holidaysList, tableHolidays)
    });
    yearSelect.addEventListener("change", () => {
        fetchHolidays(getDataHolidays, countrySelect, yearSelect, holidaysList, tableHolidays)
    });
});