class BackgroundRepository{
    /**
     * This constructor sets the base url and creates an instance of NetworkManager class
     */
    constructor() {
        this.baseUrl = "http://localhost:3000/background";
        this.networkManager = new NetworkManager();
    }

    /**
     * This function does a request to the base url via the NetworkManager
     * @returns {Promise<unknown>}
     * @param weatherState
     * @param time
     */
    async getBackgroundFor(weatherState, time) {
        return await this.networkManager.request(`${this.baseUrl}`, "POST",{keyword: weatherState, time: time});
    }

}