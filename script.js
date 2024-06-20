"use strict";

import { CalendarAPI } from "./CalendarAPI.js";
import { showTab } from "./showTab.js";


document.addEventListener("DOMContentLoaded", () => {
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


    // function showTab(idTabName) {
    //     let tabContent = document.querySelectorAll(".tab-content");

    //     tabContent.forEach((elem) => {
    //         elem.style.display = "none";
    //     });

    //     document.getElementById(idTabName).style.display = "block";
    // }

    tabButtonDate.addEventListener("click", () => showTab("tab-dates"));
    tabButtonHolidays.addEventListener("click", () => {
        showTab("tab-holidays");
        requestFetchCountries();
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

    async function requestFetchCountries() {
        try {
            const calendarApi = new CalendarAPI();
            const countries = await calendarApi.getDataCountries();
            getListCountries(countries.response.countries);
        } catch (error) {
            throw new Error("Помилка при отриманні списку країн:", error);
        }
    }

    function getListCountries(countries) {

        countries.forEach(country => {
            const option = document.createElement("option");
            option.value = country['iso-3166'];
            option.textContent = country.country_name;
            countrySelect.appendChild(option);
        });

        countrySelect.addEventListener("change", () => {
            yearSelect.disabled = !countrySelect.value;
        });
    }

    function getListYears() {
        const currentYear = new Date().getFullYear();
        for(let year = 2001; year <= 2049; year++) {
            const option = document.createElement("option")
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        };
        yearSelect.value = currentYear;
    }

    async function fetchHolidays() {
        const getCountry = countrySelect.value;
        const getYear = yearSelect.value;

        if( getCountry && getYear) {
            try {
                const calendarApi = new CalendarAPI();
                const holidays = await calendarApi.getDataHolidays(getCountry, getYear);
                holidaysList = holidays.response.holidays
                getResHolidays(holidaysList);
            } catch (error) {
                throw new Error("Помилка при отриманні списку свят:", error);   
            }
        }
    }

    function getResHolidays(holidays) {
        tableHolidays.innerHTML = "";

        holidays.forEach((holiday) => {
            const rowElem = document.createElement("tr");

            const holidaysColumnName = document.createElement("td");
            holidaysColumnName.textContent = holiday.name;
            rowElem.appendChild(holidaysColumnName);
            
            const holidaysColumnDate = document.createElement("td");
            const date = new Date(holiday.date.iso);
            const changedFormatDate = date.toLocaleString("uk-UA", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            });
            holidaysColumnDate.textContent = changedFormatDate;
            rowElem.appendChild(holidaysColumnDate);

            tableHolidays.appendChild(rowElem);
        })
    }

    function sortHolidays() {
        holidaysList.sort((a, b) => {
            const dateA = new Date(a.date.iso);
            const dateB = new Date(b.date.iso);
            return sortOrder === "ascend" ? dateB - dateA : dateA - dateB;
        });
        sortOrder = sortOrder === "ascend" ? "descend" : "ascend";
        getResHolidays(holidaysList);
    }

    sortHolidaysButton.addEventListener("click", sortHolidays);

    getCalculateResult.addEventListener("click", calculateDates);
    getUpdateResult();


    (async () => {
        await requestFetchCountries();
        getListYears();
    })();

    countrySelect.addEventListener("change", fetchHolidays);
    yearSelect.addEventListener("change", fetchHolidays);
});