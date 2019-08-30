'use strict';

/**
 * This class provides responses for the System response
 */


const utils = require("./utils/utils");
const response_strings = require("./universal_response_strings")

//weather conditions
const weather_condition_sunny = "";
const weather_condition_rainy = "";


//single date speech responses

const single_date_day_list = response_strings.speech.single_date.main_response.day_temp;
const single_date_night_list = response_strings.speech.single_date.main_response.night_temp;
//single date sun responses
const single_date_sun_positive_list = response_strings.speech.single_date.main_response.sun_positive;
const single_date_sun_negative_list = response_strings.speech.single_date.main_response.sun_negative;
const single_date_add_sun_positive_list = response_strings.speech.single_date.main_response.sun_negative;
const single_date_add_sun_negative_list = response_strings.speech.single_date.main_response.sun_negative;
//single date rain responses
const single_date_rain_positive_list = response_strings.speech.single_date.main_response.rain_positive;
const single_date_rain_negative_list = response_strings.speech.single_date.main_response.rain_negative;
const single_date_add_rain_positive_list = response_strings.speech.single_date.main_response.rain_positive;
const single_date_add_rain_negative_list = response_strings.speech.single_date.main_response.rain_negative;

//date period speech responses

const getSingleDateDayTempResponse = (weather_data) => {
    return responseBuilder(single_date_day_list, weather_data);
};

const getSingleDateNightTempResponse = (weather_data) => {
    return responseBuilder(single_date_night_list, weather_data);
};

const getSingleDateSunResponse = (weather_data, isDetailedResponse) => {
    return getWeatherCondResponse(weather_data, single_date_sun_positive_list, single_date_add_sun_positive_list, single_date_sun_negative_list, single_date_add_sun_negative_list, weather_condition_sunny, isDetailedResponse);
};

const getSingleDateRainResponse = (weather_data, isDetailedResponse) => {
    return getWeatherCondResponse(weather_data, single_date_rain_positive_list, single_date_add_rain_positive_list, single_date_rain_negative_list, single_date_add_rain_negative_list, weather_condition_rainy, isDetailedResponse);
};

/**
 * use this as filler response
 * TODO: create response functions for other weather conditions
 * @param weather_data
 * @param isDetailedResponse
 */
const getSingleDateFillerResponse = (weather_data, isDetailedResponse) => {
    return getWeatherCondResponse(weather_data, single_date_rain_positive_list, single_date_add_rain_positive_list, single_date_rain_negative_list, single_date_add_rain_negative_list, weather_condition_rainy, isDetailedResponse);
};



/**
 * gives a response from given response lists depending on the given weather_condition. If isDetailedRepsonse is true, give an additional response
 * @param weather_data
 * @param positive_response_list
 * @param add_positive_response_list
 * @param negative_response_list
 * @param add_negative_response_list
 * @param weather_condition
 * @param isDetailedResponse
 * @returns {*}
 */
const getWeatherCondResponse = (weather_data, positive_response_list, add_positive_response_list, negative_response_list, add_negative_response_list, weather_condition, isDetailedResponse) => {
    let response;
    if (weather_data.weatherCondition === weather_condition) {
        response = responseBuilder(positive_response_list, weather_data);
        if (isDetailedResponse) {
            response += responseBuilder(add_positive_response_list, weather_data);
        }
    } else {
        response = responseBuilder(negative_response_list, weather_data);
        if (isDetailedResponse) {
            response += responseBuilder(add_negative_response_list, weather_data);
        }
    }
    return response;

};

/**
 * inserts the given weather data into a random response from the given list and returns it
 * @param response_list
 * @param weather_data
 * @returns {*}
 */
const responseBuilder = (response_list, weather_data) => {
    return weather_data.insertWeatherData(utils.getRandomArrayEntry(response_list))
};

module.exports = {
    getSingleDateSunResponse,
    getSingleDateRainResponse,
    getSingleDateFillerResponse,
    getSingleDateDayTempResponse,
    getSingleDateNightTempResponse
};