export function calculateWeekends (getEndDate, getStartDate) {
    let weekends = 0;

    for (let date = new Date(getStartDate); date <= getEndDate; date.setDate(date.getDate() + 1)) {
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            weekends++;
        };
    }

    return weekends;
};
