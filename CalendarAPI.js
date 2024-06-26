import { API_URL, API_KEY } from "./constants.js";

export class CalendarAPI {
    constructor() {
        this.apiUrl = `${API_URL}/countries`;
        this.apiKey = API_KEY;
    }

    getDataCountries = async () => {
        try {
            const response = await fetch(`${this.apiUrl}?api_key=${this.apiKey}`);
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            };
            return await response.json();
        } catch (error) {
            throw new Error(error);
        }
    };

    getDataHolidays = async (country, year) => {
        try {
            const response = await fetch(`${API_URL}/holidays?api_key=${this.apiKey}&country=${country}&year=${year}`);
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            };
            return await response.json();
        } catch (error) {
            throw new Error(error);
        }
    }
};
