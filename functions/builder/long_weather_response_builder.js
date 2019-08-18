"use strict";

const utils = require('../utils/utils');
const strings = require('../jsons/long_weather_response/long_weather_response_strings');
const conv_strings = require('../jsons/long_weather_response/long_weather_response_conv_strings');
const weather_helper = require('./weather_helper');


//strings
const weather_report = strings.weather_entity_entries.report;
const weather_forecast = strings.weather_entity_entries.forecast;
const weather_outlook = strings.weather_entity_entries.outlook;
const report_article = strings.gram_article.report;
const forecast_and_outlook_article = strings.gram_article.forecast_and_outlook;

//conv_strings
const initial_response_list = conv_strings.weather_responses.initial;

const getWeatherResponse = (weather, date_original, date, location, weather_data) => {
    return buildInitialWeatherResponse(
        initial_response_list,
        weather,
        date_original, date, location)
        + weather_helper.getDayTempResponse(weather_data)
        + weather_helper.getNightTempResponse(weather_data)
        + weather_helper.getRainAndSunResponse(weather_data);
};

const buildInitialWeatherResponse = (initial_response_list, weather, date_original, date, location) => {
    return utils.firstLetterUpperCase(weather_helper.insertParametersIntoResponse(
        utils.getRandomArrayEntry(initial_response_list),
        getWeatherWithArticle(weather),
        weather_helper.getRightDateUtterance(date_original, date),
        location
    ));
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
        case weather_forecast:
            return forecast_and_outlook_article + weather;
        case weather_outlook:
            return forecast_and_outlook_article + weather;
        default:
            break;
    }
};


module.exports = {getWeatherResponse};