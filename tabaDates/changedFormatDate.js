const dataDate = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
};

export function changedFormatDate(date) {
    return date.toLocaleString("uk-UA", dataDate).replace(",", "");
};
