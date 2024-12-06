export function calculateDifferenceUnits (getCountData, differenceDate) {
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
            break;
    }

    return resultDifferenceCountUnits;
};
