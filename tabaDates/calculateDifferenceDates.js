import { calculateAllDays } from "./calculateAllDays.js";
import { calculateWeekends } from "./calculateWeekends.js";
import { calculateWorkDays } from "./calculateWorkDays.js";

export function calculateDifferenceDates (additionalParameter, getStartDate, getEndDate) {
    switch(additionalParameter) {
        case "all-days":
            return calculateAllDays(getEndDate, getStartDate);
        case "weekends":
            return calculateWeekends(getEndDate, getStartDate);
        case "work-days":
            return calculateWorkDays(getEndDate, getStartDate);
        default:
            alert("Невірні параметри!");
        return 0; 
    }
};
