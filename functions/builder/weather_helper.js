"use strict";

const utils = require('../utils/utils');
const conv_strings = require('../jsons/weather_helper/weather_helper_conv_strings');
const strings = require('../jsons/weather_helper/weather_helper_strings');

const utils_date = require('../utils/utils_date')

//strings
const today_string = strings.date_utterance.today;
const default_location = strings.default_values.location;
const default_date = strings.default_values.date;

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

/**
 * for more clarity
 * @param list
 * @param weather_data
 * @returns {*}
 */
const responseBuilder = (list, weather_data) => {
    return insertWeatherDataIntoString(utils.getRandomArrayEntry(list), weather_data);
};

/**
 * background: change "heutige", "heutiges", "heut" to "heute"
 * note:  diff for days are buggy, because dialog flow only gives the time for 0 o'clock and not the current time (negative with floor -> -1)
 * @param date_original
 * @param date
 * @returns {string}
 */
const getRightDateUtterance = (date_original, date) => {
    //get date without time
    const current_date = new Date((new Date() + "").substring(0, 10));
    const request_date = new Date((new Date(date) + "").substring(0, 10));

    let day_diff = utils_date.calculateDiffFrom2Dates(current_date, request_date, "days");
    console.log("day_diff:" + day_diff + " - weather_helper");
    if (day_diff === 0) {
        return today_string;
    } else {
        return date_original;
    }

};



/**
 * replace placeholder values in JSON with data form weather_data
 * @param response
 * @param weather_data
 * @returns {*}
 */
const insertWeatherDataIntoString = (response, weather_data) => {
    return response.replace("$dayMAX", weather_data.dayMAX)
        .replace("$dayMIN", weather_data.dayMIN)
        .replace("$nightMAX", weather_data.nightMAX)
        .replace("$nightMIN", weather_data.nightMIN)
        .replace("$sunV", weather_data.sunHours)
        .replace("$rainV", weather_data.rain)
        .replace("$currentTemp", weather_data.currentTemp)
        .replace("$weatherState", weather_data.weatherState)
};

/**
 * replace placeholder in JSON with given values
 * @param response
 * @param weather
 * @param date
 * @param location
 * @returns {*}
 */
const insertParametersIntoResponse = (response, weather, date, location) => {
    return response.replace("$weather", weather)
        .replace("$date", date)
        .replace("$location", setDefaultLocation(location));
};


/**
 * set default value for location if empty, else return the given location
 *
 * @param location
 * @returns {string|*}
 */
const setDefaultLocation = (location) => {
    if (utils.isEmpty(location)) {
        return default_location;
    }
    return location;
};

/**
 * set default value for date if empty, else return the given date
 *
 * @param date
 * @returns {string}
 */
const setDefaultDate = (date) => {
    if (utils.isEmpty(date)) {
        return new Date() + "";
    }
    return date;
};
/**
 * set date fpr today if date is empty, else return the given date
 *
 * @param date_original
 * @returns {string}
 */
const setDefaultDateOriginal = (date_original) => {
    if (utils.isEmpty(date_original)) {
        return default_date;
    }
    return date_original;
};


module.exports = {
    getDayTempResponse,
    getNightTempResponse,
    getSunHoursResponse,
    getRainResponse,
    getRainAndSunResponse,
    getRightDateUtterance,
    insertParametersIntoResponse,
    insertWeatherDataIntoString,
    setDefaultDate,
    setDefaultDateOriginal,
    setDefaultLocation

};