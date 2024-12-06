export function choicePresetAndEndDate (preset, getStartDate, endDate) {
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
        return null;
    }

    return getEndDate;
};
