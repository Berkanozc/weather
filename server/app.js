/**
 * Server application - contains all server config and api endpoints
 */

require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const corsConfig = require("./utils/corsConfigHelper");
const request = require('request');

const app = express();

app.use(morgan("short"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(corsConfig);

// ------ ROUTES -------
const httpOkCode = 200;
const badRequestCode = 400;
const authorizationErrCode = 401;

app.post("/weather/current", (req, res) => {
    const APP_ID = process.env.APP_ID;

    const getWeather = () => {
        request({
            url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + Math.round(req.body.latitude * 100) / 100 + '&lon=' + Math.round(req.body.longitude * 100) / 100 + '&cnt=5&units=metric&appid=' + APP_ID,
            json: true
        }, (error,response,body) =>{
            if(!error && response.statusCode === 200){
                res.status(httpOkCode).json(body);
            } else {
                res.status(httpOkCode).json(body);
            }
        });
    };

    getWeather()
});

app.post("/background", (req, res) =>{

    const getBackground = () => {
        const access_key = `client_id=${process.env.UNSPLASH_APP_ID}`;
        const url = `https://api.unsplash.com/search/photos?query=${req.body.keyword} ${req.body.time}&${access_key}`
        console.log(url);
        request({
            url: url,
            json: true
        }, (error,response,body) =>{
            if(!error && response.statusCode === 200){
                res.status(httpOkCode).json(body);
            } else {
                console.log(error);
                res.status(httpOkCode).json(body);
            }
        });
    };

    getBackground();
});

//------- END ROUTES -------

module.exports = app;

