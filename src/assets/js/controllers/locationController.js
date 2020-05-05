let position = [];

class LocationController{

    constructor() {
        navigator.geolocation.getCurrentPosition(this.setup);
    }

    async setup(pos) {
        position = pos;
    }

    error(){
        return "error";
    }
}