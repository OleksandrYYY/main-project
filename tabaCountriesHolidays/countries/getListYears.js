export function getListYears(yearSelect) {
    const currentYear = new Date().getFullYear();
    for(let year = 2001; year <= 2049; year++) {
        const option = document.createElement("option")
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    };
    yearSelect.value = currentYear;
}