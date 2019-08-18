"use strict";

const response_builder = require('./builder/long_weather_response_builder');
const utils = require('./utils/utils');
const card_builder = require('./builder/info_card_builder');
const weather_helper = require('./builder/weather_helper');
const {SimpleResponse} = require('actions-on-google');


const Weather = require('./model/Weather');
const RequestData = require('./model/RequestData');


const longWeatherResponse = (agent) => {
    let weather = agent.request_.body.queryResult.parameters['weather_long'];
    let date = agent.request_.body.queryResult.parameters['date'];
    let date_original = agent.request_.body.queryResult.outputContexts[0].parameters['date.original'];
    let date_period = agent.request_.body.queryResult.parameters['date-period'];
    let date_period_original = agent.request_.body.queryResult.outputContexts[0].parameters['date-period.original'];
    let custom_date_period = agent.request_.body.queryResult.parameters['custom-date-period'];
    let location = agent.request_.body.queryResult.parameters['geo-city'];

    let request_data = new RequestData(weather, date, date_original, date_period, date_period_original, custom_date_period, location);
    let weather_dummy = new Weather();


    // Set default values if not given - weather doesnt need a default value in long responses
    date = weather_helper.setDefaultDate(date);
    date_original = weather_helper.setDefaultDateOriginal(date_original);
    location = weather_helper.setDefaultLocation(location);


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


};


module.exports = longWeatherResponse;
