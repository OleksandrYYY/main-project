export function calculateAllDays (getEndDate, getStartDate) {
    const milliseconds = 24 * 60 * 60 * 1000;
    return (getEndDate - getStartDate) / milliseconds;
};
