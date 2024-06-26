export function validateInputs (startDate, additionalParameterElem, getCountDataElem) {
    if (!startDate) {
        alert("Будь ласка, введіть початкову дату.");
        return false;
    }

    if (!additionalParameterElem) {
        alert("Будь ласка, виберіть додатковий параметр.");
        return false;
    }

    if (!getCountDataElem) {
        alert("Будь ласка, виберіть одиниці підрахунку.");
        return false;
    }
    return true;
};
