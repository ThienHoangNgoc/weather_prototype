"use strict";

const response_builder = require('./builder/long_weather_response_builder');
const utils = require('./utils/utils');
const card_builder = require('./builder/info_card_builder');
const weather_helper = require('./builder/weather_helper');
const {SimpleResponse} = require('actions-on-google');


const Weather = require('./model/Weather');


const longWeatherResponse = (agent) => {
    let weather = agent.request_.body.queryResult.parameters['weather_long'];
    let date = agent.request_.body.queryResult.parameters['date'];
    let date_original = agent.request_.body.queryResult.outputContexts[0].parameters['date.original'];
    let location = agent.request_.body.queryResult.parameters['geo-city'];
    if (utils.isStringArray([weather, date, date_original, location])) {
        // weather doesnt need a default value in long responses
        date = weather_helper.setDefaultDate(date);
        date_original = weather_helper.setDefaultDateOriginal(date_original);
        location = weather_helper.setDefaultLocation(location);

        let weather_dummy = new Weather();
        console.log(weather_dummy.weatherState + "<-- Weatherstate");
        console.log(weather_dummy.isDay + "<-- isday");
        console.log(weather_dummy.currentTemp + "<-- currentTemp")


        if (agent.requestSource === agent.ACTIONS_ON_GOOGLE) {
            let conv = agent.conv();
            conv.ask(new SimpleResponse({
                speech: response_builder.getWeatherResponse(weather, date_original, date, location, weather_dummy),
                text: "insert show text ( != mit gesprochenem)"
            }));
            conv.ask(card_builder.buildDetailedWeatherCard(date, location, weather_dummy));
            agent.add(conv);
        } else {
            //Todo: implement for devices without Google Assistant

        }


    }


};


module.exports = longWeatherResponse;
