export function getUpdateResult(tableDates) {
    let resultDate = JSON.parse(localStorage.getItem("resultDates")) || [];
    tableDates.innerHTML = "";

    resultDate.forEach(({ startDate, endDate, res }) => {
        const rowElem = document.createElement("tr");

        const startDateColumn = document.createElement("td");
        startDateColumn.textContent = startDate;
        rowElem.appendChild(startDateColumn);

        const endDateColumn = document.createElement("td");
        endDateColumn.textContent = endDate;
        rowElem.appendChild(endDateColumn);

        const resDateColumn = document.createElement("td");
        resDateColumn.textContent = res;
        rowElem.appendChild(resDateColumn);

        tableDates.appendChild(rowElem);
    });
};
