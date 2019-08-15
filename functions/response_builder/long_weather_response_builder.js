"use strict";

const utils = require('../utils/utils');
const strings = require('../jsons/long_weather_response_strings');
const conv_strings = require('../jsons/long_weather_response_conv_strings');
const universal_weather_response_builder = require('./universal_weather_response_builder');


//strings
const weather_report = strings.weather_entity_entries.report;
const weather_forecast = strings.weather_entity_entries.forecast;
const weather_outlook = strings.weather_entity_entries.outlook;
const report_article = strings.gram_article.report;
const forecast_and_outlook_article = strings.gram_article.forecast_and_outlook;

//conv_strings
const initial_response_list = conv_strings.weather_responses.initial;

const getWeatherResponse = (weather, date_original, date, location, weather_data) => {
    let initial_response = utils.firstLetterUpperCase(insertValuesIntoResponse(
        utils.getRandomArrayEntry(initial_response_list),
        getWeatherWithArticle(weather),
        universal_weather_response_builder.getRightDateUtterance(date_original, date),
        location));

    return initial_response + universal_weather_response_builder.getDayTempResponse(weather_data)
        + universal_weather_response_builder.getNightTempResponse(weather_data)
        + universal_weather_response_builder.getSunHoursResponse(weather_data)
        + universal_weather_response_builder.getRainResponse(weather_data);
};

/**
 * replace placeholder in JSON with given values
 * @param response
 * @param weather
 * @param date
 * @param location
 * @returns {*}
 */
const insertValuesIntoResponse = (response, weather, date, location) => {
    return response.replace("$weather", weather)
        .replace("$date", date)
        .replace("$location", location);
};

/**
 * returns the weather utterance with the right grammatical article
 * @param weather
 * @returns {string}
 */
const getWeatherWithArticle = (weather) => {
    switch (weather) {
        case weather_report:
            return report_article + weather;
        case weather_forecast || weather_outlook:
            return forecast_and_outlook_article + weather;
        default:
            break;
    }
};


module.exports = {getWeatherResponse};