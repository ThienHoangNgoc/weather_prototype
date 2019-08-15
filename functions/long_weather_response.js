"use strict";
const {Image, Suggestions, BasicCard, Button} = require('actions-on-google');
const {Card, Suggestion} = require('dialogflow-fulfillment');

const strings = require('./jsons/strings');
const responses = require("./jsons/conv_strings");
const urls = require('./jsons/urls');

const long_weather_response_builder = require('./response_builder/long_weather_response_builder');
const utils = require('./utils/utils');

const Weather = require('./model/Weather');


const weatherLongResponse = (agent) => {
    const weather = agent.request_.body.queryResult.parameters['weather'];
    const date = agent.request_.body.queryResult.parameters['date'];
    const date_original = agent.request_.body.queryResult.outputContexts[0].parameters['date.original'];
    const location = agent.request_.body.queryResult.parameters['geo-city'];

    if (utils.isStringArray([weather, date, date_original, location])) {
        let weather_dummy = new Weather();

        if (agent.requestSource === agent.ACTIONS_ON_GOOGLE) {
            let conv = agent.conv();
            conv.ask(long_weather_response_builder.getWeatherResponse(weather, date_original, date, location, weather_dummy));
        }


    }


};


module.exports = {weatherLongResponse};
