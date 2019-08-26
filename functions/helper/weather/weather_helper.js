"use strict";

const utils = require('../utils/utils');
const conv_strings = require('./strings/weather_helper_conv_strings');
const strings = require('./strings/weather_helper_strings');
const weather_strings = require('../../jsons/weather_strings');

//conv_strings
//date
const date_day_list = conv_strings.weather_responses.date.day_time;
const date_night_list = conv_strings.weather_responses.date.night_time;
const date_sun_positive_list = conv_strings.weather_responses.date.sun_positive;
const date_sun_positive_add_list = conv_strings.weather_responses.date.sun_add_info_positive;
const date_sun_negative_list = conv_strings.weather_responses.date.sun_negative;
const date_sun_negative_add_list = conv_strings.weather_responses.date.sun_add_info_negative;
const date_rain_positive_list = conv_strings.weather_responses.date.rain_positive;
const date_rain_negative_list = conv_strings.weather_responses.date.rain_negative;
const date_rain_universal_add_list = conv_strings.weather_responses.date.rain_add_info;

const response_text_neutral = conv_strings.response_text.date.neutral;
const response_text_sun = conv_strings.response_text.date.sun;
const response_text_rain = conv_strings.response_text.date.rain;

//date-period
//note: these are static responses, subject to change compare with date
const date_period_day_list = conv_strings.weather_responses.date_period.day_time;
const date_period_night_list = conv_strings.weather_responses.date_period.night_time;
const date_period_rest_list = conv_strings.weather_responses.date_period.rest;

const response_date_period_text_list = conv_strings.response_text.date_period;

const getDateSunHoursResponse = (weather_data, additional_info) => {
    let response;
    if (weather_data.isSunny) {
        response = responseBuilder(date_sun_positive_list, weather_data);
        if (additional_info) {
            response += responseBuilder(date_sun_positive_add_list, weather_data);
        }
    } else {
        response = responseBuilder(date_sun_negative_list, weather_data);
        if (additional_info) {
            response += responseBuilder(date_sun_negative_add_list, weather_data);
        }
    }
    return response;
};

const getDateRainResponse = (weather_data, additional_info) => {
    let response;
    if (weather_data.isSunny) {
        response = responseBuilder(date_rain_negative_list, weather_data);
    } else {
        response = responseBuilder(date_rain_positive_list, weather_data);
    }
    if (additional_info) {
        response += responseBuilder(date_rain_universal_add_list, weather_data);
    }
    return response;
};
/**
 * returns a logical combination of rain and sun response
 * note: sun_pos + rain_neg & rain_pos + sun_neg
 * note: no additional info when both are asked, rather show info card
 * @param weather_data
 * @returns {*}
 */
const getDateRainAndSunResponse = (weather_data) => {
    if (weather_data.isSunny) {
        return getDateSunHoursResponse(weather_data, false) + getDateRainResponse(weather_data, false);
    } else {
        return getDateRainResponse(weather_data, false) + getDateSunHoursResponse(weather_data, false);
    }
};

const getDateDayTempResponse = (weather_data) => {
    return responseBuilder(date_day_list, weather_data);
};

const getDateNightTempResponse = (weather_data) => {
    return responseBuilder(date_night_list, weather_data);
};

/**
 * generate displayed text, depending on the weather state for a single date
 *
 * @param weather_data
 */
const getWeatherTextForDate = (weather_data) => {
    let random_sun_text = utils.getRandomArrayEntry(response_text_sun);
    let random_rain_text = utils.getRandomArrayEntry(response_text_rain);
    let random_neutral_text = utils.getRandomArrayEntry(response_text_neutral);
    switch (weather_data.weatherState) {
        case weather_strings.weather_state.sunny:
            return random_sun_text;
        case weather_strings.weather_state.clear:
            return random_sun_text;
        case weather_strings.weather_state.rainy:
            return random_rain_text;
        case weather_strings.weather_state.rainstorm:
            return random_rain_text;
        case weather_strings.weather_state.tempest:
            return random_rain_text;
        default:
            return random_neutral_text;
    }
};

const getWeatherTextForDatePeriod = () => {
    return utils.getRandomArrayEntry(response_date_period_text_list);
};

const getDatePeriodDayTempResponse = () => {
    return utils.getRandomArrayEntry(date_period_day_list);
};

const getDatePeriodNightTempResponse = () => {
    return utils.getRandomArrayEntry(date_period_night_list);
};

/**
 * Todo: split into sun hours and rain
 * @returns {Array}
 */
const getDatePeriodRestResponse = () => {
    return utils.getRandomArrayEntry(date_period_rest_list);
};


/**
 * for more clarity
 * @param list
 * @param weather_data
 * @returns {*}
 */
const responseBuilder = (list, weather_data) => {
    return weather_data.insertWeatherData(utils.getRandomArrayEntry(list));
};





module.exports = {
    getDateDayTempResponse,
    getDateNightTempResponse,
    getDateSunHoursResponse,
    getDateRainResponse,
    getDateRainAndSunResponse,
    getWeatherTextForDate,
    getWeatherTextForDatePeriod,
    getDatePeriodDayTempResponse,
    getDatePeriodNightTempResponse,
    getDatePeriodRestResponse,



};