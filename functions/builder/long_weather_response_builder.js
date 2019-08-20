"use strict";

const utils = require('../utils/utils');
const strings = require('../jsons/long_weather_response/long_weather_response_strings');
const conv_strings = require('../jsons/long_weather_response/long_weather_response_conv_strings');
const weather_helper = require('./weather_helper');
const card_builder = require('../builder/info_card_builder');


//strings


//conv_strings
const initial_response_list = conv_strings.weather_responses.initial;

const getWeatherResponse = (request_data, weather_data) => {
    if (request_data.isDatePeriod) {
        return buildInitialWeatherResponse(initial_response_list, request_data);
    } else {
        return buildInitialWeatherResponse(initial_response_list, request_data)
            + weather_helper.getDayTempResponse(weather_data)
            + weather_helper.getNightTempResponse(weather_data)
            + weather_helper.getRainAndSunResponse(weather_data);
    }

};

const getWeatherCard = (request_data, weather_data) => {
    return card_builder.buildDetailedWeatherCard(request_data, weather_data);
};


const buildInitialWeatherResponse = (initial_response_list, request_data) => {
    let randomResponse = utils.getRandomArrayEntry(initial_response_list);
    return utils.firstLetterUpperCase(request_data.insertRequestData(randomResponse));
};


module.exports = {getWeatherResponse, getWeatherCard};