"use strict";

const utils = require('../utils/utils');
const conv_strings = require('../jsons/universal_weather_response_conv_strings');
const utils_date = require('../utils/utils_date')

//strings
const today_string = "";
const tomorrow_string = "";
const day_after_tomorrow_string = "";
const no_past_data_string = "";
const no_future_data_string = "";

//conv_strings
const day_response_list = conv_strings.weather_responses.day_time;
const night_response_list = conv_strings.weather_responses.night_time;
const sun_hours_positive_response_list = conv_strings.weather_responses.sun_positive;
const sun_hours_negative_response_list = conv_strings.weather_responses.sun_negative;
const rain_positive_response_list = conv_strings.weather_responses.rain_positive;
const rain_negative_response_list = conv_strings.weather_responses.rain_negative;


const getSunHoursResponse = (weather_data) => {
    if (weather_data.isSunny) {
        return insertValuesIntoResponse(utils.getRandomArrayEntry(sun_hours_positive_response_list), weather_data);
    } else {
        return insertValuesIntoResponse(utils.getRandomArrayEntry(sun_hours_negative_response_list), weather_data);
    }

};

const getRainResponse = (weather_data) => {
    if (weather_data.isSunny) {
        return insertValuesIntoResponse(utils.getRandomArrayEntry(rain_negative_response_list), weather_data);
    } else {
        return insertValuesIntoResponse(utils.getRandomArrayEntry(rain_positive_response_list), weather_data);
    }

};

const getDayTempResponse = (weather_data) => {
    return insertValuesIntoResponse(utils.getRandomArrayEntry(day_response_list), weather_data);
};

const getNightTempResponse = (weather_data) => {
    return insertValuesIntoResponse(utils.getRandomArrayEntry(night_response_list), weather_data);
};

/**
 * background: change "heutige", "heutiges", "heut" to "heute"
 * @param date_original
 * @param date
 * @returns {string}
 */
const getRightDateUtterance = (date_original, date) => {
    const current_date = new Date();
    const request_date = new Date(date);
    let day_diff = utils_date.calculateDiffFrom2Dates(current_date, request_date, "days");
    if (day_diff === 0) {
        return today_string;
    } else {
        return date_original;
    }

};

const insertValuesIntoResponse = (response, weather_data) => {
    return response.replace("$dayMAX", weather_data.dayMAX)
        .replace("$dayMIN", weather_data.dayMIN)
        .replace("$nightMAX", weather_data.nightMAX)
        .replace("$nightMIN", weather_data.nightMIN)
        .replace("$sunV", weather_data.sunHours)
        .replace("$rainV", weather_data.rain)
};

module.exports = {
    getDayTempResponse,
    getNightTempResponse,
    getSunHoursResponse,
    getRainResponse,
    getRightDateUtterance
};