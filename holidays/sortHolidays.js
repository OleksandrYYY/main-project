import { getResHolidays } from "./getResHolidays.js";

export function sortHolidays(holidaysList, sortOrder) {
    holidaysList.sort((a, b) => {
        const dateA = new Date(a.date.iso);
        const dateB = new Date(b.date.iso);
        return sortOrder === "ascend" ? dateB - dateA : dateA - dateB;
    });
    sortOrder = sortOrder === "ascend" ? "descend" : "ascend";
    // getResHolidays(holidaysList);
    getResHolidays(holidaysList, document.querySelector("#result-table-holidays tbody"));
    return sortOrder;
}