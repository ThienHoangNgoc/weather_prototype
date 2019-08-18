"use strict";

const utils = require('../utils/utils');
const weather_helper = require('./weather_helper');
const conv_strings = require('../jsons/normal_weather_response/normal_weather_response_conv_strings');
const strings = require('../jsons/normal_weather_response/normal_weather_response_strings');


const initial_response_list = conv_strings.weather_responses.initial;
const weather_string = strings.weather_entity_entries.weather;

const getWeatherResponse = (weather, date_original, date, location, weather_data) => {
    return buildInitialWeatherResponse(setWeatherWhenEmpty(weather), date_original, date, location, weather_data)
        + weather_helper.getNightTempResponse(weather_data);
};

/**
 * set default value for weather string if empty, else return the given weather string
 * @param weather
 * @returns {*}
 */
const setWeatherWhenEmpty = (weather) => {
    if (utils.isEmpty(weather)) {
        weather = weather_string;
    }
    return weather;
};

const buildInitialWeatherResponse = (weather, date_original, date, location, weather_data) => {
    return utils.firstLetterUpperCase(
        weather_helper.insertParametersIntoResponse(
            weather_helper.insertWeatherDataIntoString(initial_response_list, weather_data),
            weather,
            weather_helper.getRightDateUtterance(date_original, date),
            location))
};

module.exports = {getWeatherResponse};