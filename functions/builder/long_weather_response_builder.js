"use strict";

const utils = require('../utils/utils');
const strings = require('../jsons/long_weather_response/long_weather_response_strings');
const conv_strings = require('../jsons/long_weather_response/long_weather_response_conv_strings');
const weather_helper = require('./weather_helper');
const card_builder = require('../builder/info_card_builder');
const {Suggestions} = require('actions-on-google');


//strings


//conv_strings
const initial_response_list_date = conv_strings.weather_responses.date;
const initial_response_list_date_period = conv_strings.weather_responses.date_period;
const suggestion_list = strings.suggestion_list;


const getWeatherResponse = (request_data, weather_data) => {
    if (request_data.isDatePeriod) {
        return buildInitialWeatherResponse(initial_response_list_date_period, request_data) + weather_helper.getGenericResponseForDatePeriod();
    } else {
        return buildInitialWeatherResponse(initial_response_list_date, request_data)
            + weather_helper.getDayTempResponse(weather_data)
            + weather_helper.getNightTempResponse(weather_data)
            + weather_helper.getRainAndSunResponse(weather_data);
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
        return " ";
    } else {
        return card_builder.buildDetailedWeatherCard(request_data, weather_data);
    }

};

const getSuggestions = () => {
    return new Suggestions(suggestion_list);
};


const buildInitialWeatherResponse = (initial_response_list, request_data) => {
    let randomResponse = utils.getRandomArrayEntry(initial_response_list);
    return utils.firstLetterUpperCase(request_data.insertRequestData(randomResponse));
};


module.exports = {getWeatherResponse, getWeatherCard, getWeatherText, getSuggestions};