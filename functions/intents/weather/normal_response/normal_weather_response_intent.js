"use strict";

const response_builder = require('./normal_weather_response_builder');
const {SimpleResponse} = require('actions-on-google');
const project_strings = require('../../../jsons/project_strings');

const WeatherData = require('../../../model/WeatherData');
const WeatherDummy = require('../../../model/SingleDateWeatherDataDummy');
const RequestData = require('../../../model/RequestData');


const normalWeatherResponse = (agent) => {
    let weather = agent.request_.body.queryResult.parameters['weather_normal'];
    let date = agent.request_.body.queryResult.parameters['date'];
    let date_utterance = agent.request_.body.queryResult.outputContexts[0].parameters['date.original'];
    let date_period = agent.request_.body.queryResult.parameters['date-period'];
    let date_period_utterance = agent.request_.body.queryResult.outputContexts[0].parameters['date-period.original'];
    let custom_date_period = agent.request_.body.queryResult.parameters['custom_date_period'];
    let custom_date_period_utterance = agent.request_.body.queryResult.outputContexts[0].parameters['custom_date_period.original'];
    let location = agent.request_.body.queryResult.parameters['geo-city'];

    let request_data = new RequestData(weather, date, date_utterance, date_period, date_period_utterance, custom_date_period, custom_date_period_utterance, location);
    let weather_dummy = new WeatherDummy();
    let weather_data = new WeatherData(weather_dummy);


    if (agent.requestSource === agent.ACTIONS_ON_GOOGLE) {
        let conv = agent.conv();
        conv.ask(new SimpleResponse({
            speech: response_builder.getWeatherResponse(request_data, weather_data),
            text: response_builder.getWeatherText(request_data, weather_data)
        }));
        conv.ask(response_builder.getWeatherCard(request_data, weather_data));
        conv.ask(response_builder.getSuggestions());
        conv.ask(response_builder.getRandomMoreWeatherResponse());
        agent.add(conv);
        agent.context.set({
            name: project_strings.contexts.normal_weather_response,
            lifespan: 99,
            parameters: {
                context_start_date: request_data.start_date,
                context_end_date: request_data.end_date,
                date_utterance: request_data.date_utterance,
                location: request_data.location,
                isDatePeriod: request_data.is_single_date
            }
        })
    } else {
        //Todo: implement for devices without Google Assistant
    }


};


module.exports = normalWeatherResponse;
