import { changedFormatDate } from "./changedFormatDate.js";

export function getSaveResult(startDate, endDate, res) {
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
};
