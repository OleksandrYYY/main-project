export function calculateWorkDays (getEndDate, getStartDate) {
    let workDays = 0;

    for (let date = new Date(getStartDate); date <= getEndDate; date.setDate(date.getDate() + 1)) {
        const dayOfWeek = date.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            workDays++;
        }
    }

    return workDays;
};
