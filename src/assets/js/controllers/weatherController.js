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

        let weatherPromise;
        // When something is wrong while fetching data the page will refresh
        try{
            weatherPromise = this.getWeatherPromise();
        } catch (e) {
            window.location.reload();
        }

        // Resolve promise
        await weatherPromise.then((result) => this.weather = result);

        // Get Background with current city name
        this.backgroundController = new BackgroundController();
        await this.backgroundController.getBackgroundFor(this.weather['weather'][0]['main']);

        // Add weather data to dom
        $(".content").empty().append(this.weatherView);
        this.addToDom(this.weather);
    }

    getWeatherPromise(){
        return this.weatherRepository.getWeatherForCoordinates(
            position.coords.latitude,
            position.coords.longitude
        );
    }

    addToDom(result){
        $("#temperature").text(Math.round((result['main']['temp'] * 100) / 100) + '℃');
        $("#status").text(result['weather'][0]['description']);
        $("#place").text(`Weather for ${result['name']}`);
        $("#icon").attr('src', 'assets/img/weatherIcons/' + result['weather'][0].icon + '.svg');
    }

    error(error){
        console.log(`${error}: error`);
    }
}