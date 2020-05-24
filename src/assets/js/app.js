const WEATHER_CONTROLLER = "weather";
const BACKGROUND_CONTROLLER = "background";
const networkManager = new NetworkManager();

class App {

    init(){
        this.loadController(WEATHER_CONTROLLER);
    }

    loadController(name){
        switch (name) {
            case WEATHER_CONTROLLER:
                new WeatherController();
                break;
        }
    }
}

const app = new App();

$(function(){
    app.init();
});