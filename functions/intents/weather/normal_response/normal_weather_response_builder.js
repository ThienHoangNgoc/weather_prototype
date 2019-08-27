"use strict";

const utils = require('../../../helper/utils/utils');
const strings = require('./strings/normal_weather_response_strings');
const conv_strings = require('./strings/normal_weather_response_conv_strings');
const weather_helper = require('../../../helper/weather/weather_helper');
const response_helper = require('../../../helper/response_helper');

const card_builder = require('../../../helper/card_builder/info_card_builder');
const {Suggestions} = require('actions-on-google');

//strings
const date_utterance_weekend = strings.date_utterance.weekend;

//conv_strings
const initial_response_list_date = conv_strings.weather_responses.date;
const initial_response_list_date_period = conv_strings.weather_responses.date_period;
const initial_response_list_weekend = conv_strings.weather_responses.weekend;
const suggestion_list = strings.suggestions.list;
const follow_up_suggestion_list = strings.suggestions.follow_up_list;
const suggestion_quit = strings.suggestions.quit;

const getWeatherResponse = (request_data, weather_data) => {
    if (request_data.isDatePeriod) {
        if (utils.containsString(request_data.date_utterance, date_utterance_weekend)) {
            return buildInitialWeatherResponse(initial_response_list_weekend, request_data)
                + weather_helper.getDatePeriodNightTempResponse()
        } else {
            return buildInitialWeatherResponse(initial_response_list_date_period, request_data)
                + weather_helper.getDatePeriodNightTempResponse()
        }
    } else {
        return weather_data.insertWeatherData(buildInitialWeatherResponse(initial_response_list_date, request_data))
            + weather_helper.getDateNightTempResponse(weather_data)
    }

};

const getWeatherText = (request_data, weather_data) => {
    if (request_data.isDatePeriod) {
        return weather_helper.getWeatherTextForDatePeriod();
    } else {
        return weather_helper.getWeatherTextForDate(weather_data);
    }

};

const getWeatherCard = (request_data, weather_data) => {
    if (request_data.isDatePeriod) {
        return card_builder.buildWeatherCardForDatePeriod(request_data);
    } else {
        return card_builder.buildDetailedWeatherCard(request_data, weather_data);
    }

};

const getRandomMoreWeatherResponse = () => {
    return weather_helper.getRandomMoreWeatherResponse();
}

const getSuggestions = () => {
    return new Suggestions(response_helper.getRandomSuggestionsList(suggestion_list, suggestion_quit));
};

const getFollowUpSuggestions = () => {
    return new Suggestions(response_helper.getRandomSuggestionsList(follow_up_suggestion_list, suggestion_quit));
};


const buildInitialWeatherResponse = (initial_response_list, request_data) => {
    let randomResponse = utils.getRandomArrayEntry(initial_response_list);
    return utils.firstLetterUpperCase(request_data.insertRequestData(randomResponse));
};


module.exports = {
    getWeatherResponse,
    getWeatherCard,
    getWeatherText,
    getSuggestions,
    getFollowUpSuggestions,
    getRandomMoreWeatherResponse
};