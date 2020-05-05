class WeatherController{

    constructor() {
        // Creates an new instance of the weather repository
        this.weatherRepository = new WeatherRepository();
        // Creates an new instance of the locationController and update position global var
        new LocationController();

        $.get("assets/views/weather.html")
            .done((data) => this.setup(data))
            .fail((error) => this.error(error))
    }

    async setup(data){
        this.weatherView = $(data);

        // Get current location from user
        console.log(position);
        // Get weather with current location
        const weather = this.weatherRepository.getWeatherForCoordinates(
            position.coords.latitude,
            position.coords.longitude
        );

        console.log(weather);
        // Add weather data to dom

        $(".content").empty().append(this.weatherView);
    }

    async getUserLocation(){
        return navigator.geolocation.getCurrentPosition();
    }

    error(error){
        console.log(`${error}: error`);
    }
}