'use strict';

const project_strings = require('../../../../jsons/project_strings');
const response_builder = require('../normal_weather_response_builder');
const utils = require('../../../../utils/utils');
const {SimpleResponse} = require('actions-on-google');


const RequestData = require('../../../../model/RequestData');
const Weather = require('../../../../model/Weather');

const normalWeatherResponseFollowUp = (agent) => {

    let normal_weather_context = agent.context.get(project_strings.contexts.normal_weather_response);
    let weather = agent.request_.body.queryResult.parameters['weather_normal'];
    let date = agent.request_.body.queryResult.parameters['date'];
    let date_utterance = agent.request_.body.queryResult.outputContexts[0].parameters['date.original'];
    let date_period = agent.request_.body.queryResult.parameters['date-period'];
    let date_period_utterance = agent.request_.body.queryResult.outputContexts[0].parameters['date-period.original'];
    let custom_date_period = agent.request_.body.queryResult.parameters['custom_date_period'];
    let custom_date_period_utterance = agent.request_.body.queryResult.outputContexts[0].parameters['custom_date_period.original'];
    let location = agent.request_.body.queryResult.parameters['geo-city'];

    let isDatePeriod = normal_weather_context.parameters.isDatePeriod;

    if (utils.isEmpty(date)) {
        if (utils.isEmpty(date_period) && isDatePeriod) {
            date_period = {
                startDate: normal_weather_context.parameters.context_start_date,
                endDate: normal_weather_context.parameters.endDate
            };
            date_period_utterance = normal_weather_context.parameters.date_utterance;
        } else {
            date = normal_weather_context.parameters.context_start_date;
            date_utterance = normal_weather_context.parameters.date_utterance;
        }
    }

    if (utils.isEmpty(location)) {
        location = normal_weather_context.parameters.location;
    }

    let weather_dummy = new Weather();
    let request_data = new RequestData(weather, date, date_utterance, date_period, date_period_utterance, custom_date_period, custom_date_period_utterance, location);
    let conv = agent.conv();
    conv.ask(new SimpleResponse({
        speech: response_builder.getWeatherResponse(request_data, weather_dummy),
        text: response_builder.getWeatherText(request_data, weather_dummy)
    }));
    conv.ask(response_builder.getWeatherCard(request_data, weather_dummy));
    conv.ask(response_builder.getFollowUpSuggestions());
    agent.add(conv);


};


module.exports = normalWeatherResponseFollowUp;