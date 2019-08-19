"use strict";

const response_builder = require('./builder/long_weather_response_builder');
const weather_helper = require('./builder/weather_helper');
const card_builder = require('./builder/info_card_builder');
const {SimpleResponse} = require('actions-on-google');


const Weather = require('./model/Weather');
const RequestData = require('./model/RequestData');


const longWeatherResponse = (agent) => {
    let weather = agent.request_.body.queryResult.parameters['weather_long'];
    let date = agent.request_.body.queryResult.parameters['date'];
    let date_original = agent.request_.body.queryResult.outputContexts[0].parameters['date.original'];
    let date_period = agent.request_.body.queryResult.parameters['date-period'];
    let date_period_original = agent.request_.body.queryResult.outputContexts[0].parameters['date-period.original'];
    let custom_date_period = agent.request_.body.queryResult.parameters['custom_date_period'];
    let location = agent.request_.body.queryResult.parameters['geo-city'];


    let request_data = new RequestData(weather, date, date_original, date_period, date_period_original, custom_date_period, location);
    let weather_dummy = new Weather();


    if (agent.requestSource === agent.ACTIONS_ON_GOOGLE) {
        let conv = agent.conv();
        conv.ask(new SimpleResponse({
            speech: response_builder.getWeatherResponse(request_data, weather_dummy),
            text: weather_helper.getWeatherText(weather_dummy)
        }));
        conv.ask(card_builder.buildDetailedWeatherCard(request_data, weather_dummy));
        agent.add(conv);
    } else {
        //Todo: implement for devices without Google Assistant

    }


};


module.exports = longWeatherResponse;
