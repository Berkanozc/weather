class BackgroundController{
    constructor() {
        this.backgroundRepository = new BackgroundRepository();
    }

    async getBackgroundFor(weatherState) {
        if (weatherState !== undefined) {
            // Get backgrounds and choose best picture for screen resolution
            const backgroundsPromise = this.backgroundRepository.getBackgroundFor(weatherState, this.getDayState());
            await backgroundsPromise.then((result) => this.backgrounds = result);

            let chosenBackgrounds = [];

            for(let i = 0; i < this.backgrounds['results'].length; i++){
                const background = this.getBestBackground(this.backgrounds['results'][i])
                if(background !== "invalid"){
                    chosenBackgrounds.push(background);
                }
            }

            this.addBackgroundToDom(chosenBackgrounds[this.getRandomNumber(chosenBackgrounds.length)])
        } else {
            console.log(weatherState);
            console.log("City name is not defined");
        }
    }

    getBestBackground(background) {
        // for(let i = 0; i < KEY_WORDS.length; i++){
        //     if(JSON.stringify(background).includes(KEY_WORDS[i])){
                return background;
        //     }
        // }

        // return "invalid";
    }

    getRandomNumber(max){
        return Math.floor(Math.random() * max);
    }

    getDayState(){
        const Today = new Date();
        const hour = Today.getHours();
        if(hour >= 21 || hour <= 4){
            return "night";
        } else {
            return "day";
        }
    }

    addBackgroundToDom(background){
        $(".background").css("background-image", `url('${background['urls']['full']}')`);
        // Add credits to footer
        $("footer p").text(`Background image by ${background['user']['name']}`)
    }

}