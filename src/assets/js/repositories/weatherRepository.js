const APP_ID = "aa811a502089591a0c78c88881ccd72d";

class WeatherRepository{
    /**
     * This constructor sets the base url and creates an instance of NetworkManager class
     */
    constructor() {
        this.baseUrl = "http://api.openweathermap.org/data/2.5/weather";
        this.networkManager = new NetworkManager();
    }

    /**
     * This function does a request to the base url via the NetworkManager
     * @param cityName
     * @returns {Promise<unknown>}
     */
    async getWeatherForCityName(cityName) {
        return await this.networkManager.request(`${this.baseUrl}?&q=${cityName}appid=${APP_ID}`);
    }

    async getWeatherForCoordinates(lat, lon){
        console.log(`${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${APP_ID}`)
        return await this.networkManager.request(`${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${APP_ID}`, "GET")
    }
}