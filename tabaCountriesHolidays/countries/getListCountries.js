export function getListCountries(countries, countrySelect, yearSelect) {

    countries.forEach(country => {
        const option = document.createElement("option");
        option.value = country['iso-3166'];
        option.textContent = country.country_name;
        countrySelect.appendChild(option);
    });

    countrySelect.addEventListener("change", () => {
        yearSelect.disabled = !countrySelect.value;
    });
}