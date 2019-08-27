"use strict";

const response_builder = require('./long_weather_response_builder');
const {SimpleResponse} = require('actions-on-google');
const project_strings = require('../../../jsons/project_strings');

const Weather = require('../../../model/Weather');
const RequestData = require('../../../model/RequestData');


const longWeatherResponse = (agent) => {
    let weather = agent.request_.body.queryResult.parameters['weather_long'];
    let date = agent.request_.body.queryResult.parameters['date'];
    let date_utterance = agent.request_.body.queryResult.outputContexts[0].parameters['date.original'];
    let date_period = agent.request_.body.queryResult.parameters['date-period'];
    let date_period_utterance = agent.request_.body.queryResult.outputContexts[0].parameters['date-period.original'];
    let custom_date_period = agent.request_.body.queryResult.parameters['custom_date_period'];
    let custom_date_period_utterance = agent.request_.body.queryResult.outputContexts[0].parameters['custom_date_period.original'];
    let location = agent.request_.body.queryResult.parameters['geo-city'];


    let request_data = new RequestData(weather, date, date_utterance, date_period, date_period_utterance, custom_date_period, custom_date_period_utterance, location);
    let weather_dummy = new Weather();


    if (agent.requestSource === agent.ACTIONS_ON_GOOGLE) {
        response_builder.resetGivenContext(project_strings.contexts.normal_weather_response, agent);
        let conv = agent.conv();
        conv.ask(new SimpleResponse({
            speech: response_builder.getWeatherResponse(request_data, weather_dummy),
            text: response_builder.getWeatherText(request_data, weather_dummy)
        }));
        conv.ask(response_builder.getWeatherCard(request_data, weather_dummy));
        conv.ask(response_builder.getRandomMoreWeatherResponse());
        conv.ask(response_builder.getSuggestions());
        agent.add(conv);
    } else {
        //Todo: implement for devices without Google Assistant
    }


};


module.exports = longWeatherResponse;
