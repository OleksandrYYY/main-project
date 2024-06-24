export function getResHolidays(holidays, tableHolidays) {
    tableHolidays.innerHTML = "";

    holidays.forEach((holiday) => {
        const rowElem = document.createElement("tr");

        const holidaysColumnName = document.createElement("td");
        holidaysColumnName.textContent = holiday.name;
        rowElem.appendChild(holidaysColumnName);
        
        const holidaysColumnDate = document.createElement("td");
        const date = new Date(holiday.date.iso);
        const changedFormatDate = date.toLocaleString("uk-UA", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
        holidaysColumnDate.textContent = changedFormatDate;
        rowElem.appendChild(holidaysColumnDate);

        tableHolidays.appendChild(rowElem);
    })
}