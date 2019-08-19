"use strict";

const utils = require('../utils/utils');
const conv_strings = require('../jsons/weather_helper/weather_helper_conv_strings');
const strings = require('../jsons/weather_helper/weather_helper_strings');
const weather_strings = require('../jsons/weather_strings');


//conv_strings
const day_list = conv_strings.weather_responses.day_time;
const night_list = conv_strings.weather_responses.night_time;
const sun_positive_list = conv_strings.weather_responses.sun_positive;
const sun_positive_add_list = conv_strings.weather_responses.sun_add_info_positive;
const sun_negative_list = conv_strings.weather_responses.sun_negative;
const sun_negative_add_list = conv_strings.weather_responses.sun_add_info_negative;
const rain_positive_list = conv_strings.weather_responses.rain_positive;
const rain_negative_list = conv_strings.weather_responses.rain_negative;
const rain_universal_add_list = conv_strings.weather_responses.rain_add_info;
const response_text_neutral = conv_strings.response_text.neutral;
const response_text_sun = conv_strings.response_text.sun;
const response_text_rain = conv_strings.response_text.rain;


const getSunHoursResponse = (weather_data, additional_info) => {
    let response;
    if (weather_data.isSunny) {
        response = responseBuilder(sun_positive_list, weather_data);
        if (additional_info) {
            response += responseBuilder(sun_positive_add_list, weather_data);
        }
    } else {
        response = responseBuilder(sun_negative_list, weather_data);
        if (additional_info) {
            response += responseBuilder(sun_negative_add_list, weather_data);
        }
    }
    return response;
};

const getRainResponse = (weather_data, additional_info) => {
    let response;
    if (weather_data.isSunny) {
        response = responseBuilder(rain_negative_list, weather_data);
    } else {
        response = responseBuilder(rain_positive_list, weather_data);
    }
    if (additional_info) {
        response += responseBuilder(rain_universal_add_list, weather_data);
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
const getRainAndSunResponse = (weather_data) => {
    if (weather_data.isSunny) {
        return getSunHoursResponse(weather_data, false) + getRainResponse(weather_data, false);
    } else {
        return getRainResponse(weather_data, false) + getSunHoursResponse(weather_data, false);
    }
};

const getDayTempResponse = (weather_data) => {
    return responseBuilder(day_list, weather_data);
};

const getNightTempResponse = (weather_data) => {
    return responseBuilder(night_list, weather_data);
};

const getWeatherText = (weather_data) => {
    switch (weather_data.weatherState) {
        case weather_strings.weather_state.sunny:
            return response_text_sun;
        case weather_strings.weather_state.clear:
            return response_text_sun;
        case weather_strings.weather_state.rainy:
            return response_text_rain;
        case weather_strings.weather_state.rainstorm:
            return response_text_rain;
        case weather_strings.weather_state.tempest:
            return response_text_rain;
        default:
            return response_text_neutral;
    }


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
    getDayTempResponse,
    getNightTempResponse,
    getSunHoursResponse,
    getRainResponse,
    getRainAndSunResponse,
    getWeatherText


};