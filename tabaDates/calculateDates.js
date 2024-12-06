import { getSaveResult } from "./getSaveResult.js";
import { getUpdateResult } from "./getUpdateResult.js";
import { validateInputs } from "./validateInputs.js";
import { choicePresetAndEndDate } from "./choicePresetAndEndDate.js";
import { calculateDifferenceDates } from "./calculateDifferenceDates.js";
import { calculateDifferenceUnits } from "./calculateDifferenceUnits.js";

export function calculateDates(tableDates) {
    const startDate = document.querySelector("#start-date").value;
    let endDate = document.querySelector("#end-date").value;
    const additionalParameterElem = document.querySelector("input[name='additional-parameters']:checked");
    const getCountDataElem = document.querySelector("input[name='count-data']:checked");
    const additionalParameter = additionalParameterElem.value;
    const getCountData = getCountDataElem.value;

    const preset = document.querySelector("#preset").value;
    const getStartDate = new Date(startDate);

    const getEndDate = choicePresetAndEndDate(preset, getStartDate, endDate);
    const differenceDate = calculateDifferenceDates(additionalParameter, getStartDate, getEndDate);
    const resultDifferenceCountUnits = calculateDifferenceUnits(getCountData, differenceDate);


    validateInputs(startDate, additionalParameterElem, getCountDataElem);


    getSaveResult(getStartDate, getEndDate, resultDifferenceCountUnits);
    getUpdateResult(tableDates);

    document.getElementById("result").innerText = resultDifferenceCountUnits;
}