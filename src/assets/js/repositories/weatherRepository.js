class WeatherRepository{
    /**
     * This constructor sets the base url and creates an instance of NetworkManager class
     */
    constructor() {
        this.baseUrl = "http://localhost:3000/weather";
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
        return await this.networkManager.request(`${this.baseUrl}/current`, "POST", {latitude: lat, longitude: lon})
    }
}