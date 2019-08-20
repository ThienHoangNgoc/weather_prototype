"use strict";
const {Image, Suggestions, BasicCard, Button, SimpleResponse} = require('actions-on-google');
const {Card, Suggestion} = require('dialogflow-fulfillment');

const response_builder = require('../helper/normal_weather_response_builder_old');
const utils = require('../utils/utils');
const Weather = require('../model/Weather');

const normalWeatherResponse = (agent) => {
    const weather = agent.request_.body.queryResult.parameters['weather'];
    const date = agent.request_.body.queryResult.parameters['date'];
    const date_original = agent.request_.body.queryResult.outputContexts[0].parameters['date.original'];
    const location = agent.request_.body.queryResult.parameters['geo-city'];

    if (utils.isStringArray([weather, date, date_original, location])) {
        let weather_dummy = new Weather();
        if (agent.requestSource === agent.ACTIONS_ON_GOOGLE) {
            let conv = agent.conv();
            conv.ask(response_builder.getWeatherResponse(weather, date_original, date, location, weather_dummy));
            conv.ask("");
            /*  conv.ask(new SimpleResponse({
                  text:"",
                  speech:long_weather_response_builder.getWeatherResponse(weather, date_original, date, location, weather_dummy)
              }))*/
            agent.add(conv);
        }else {
            //Todo: implement for devices without Google Assistant

        }
    }

};


module.exports = {normalWeatherResponse};