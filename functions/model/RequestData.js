'use strict';

const utils = require('../utils/utils');
const utils_date = require('../utils/utils_date');
const strings = require('../jsons/request_data_strings');


//strings
const weather_report = strings.weather_entity_entries.report;
const weather_forecast = strings.weather_entity_entries.forecast;
const weather_outlook = strings.weather_entity_entries.outlook;
const report_article = strings.gram_article.report;
const forecast_and_outlook_article = strings.gram_article.forecast_and_outlook;
const default_date = strings.default_values.date;
const default_location = strings.default_values.location;
const default_weather = strings.default_values.weather;
const today_string = strings.date_utterance.today;
const custom_format = strings.custom_date_format;


const requestData = class RequestData {

    constructor(weather, date, date_original, date_period, date_period_original, custom_date_period, location) {
        this.weather = this.setDefaultWeather(weather);
        this.weather = this.setWeatherWithArticle(this.weather);
        this.date = this.setDefaultDate(date);
        this.date_original = this.setDefaultDateOriginal(date_original);
        this.date_original = this.getRightDateUtterance(this.date, this.date_original);
        this.date_period = date_period;
        this.date_period_original = date_period_original;
        this.custom_date_period = custom_date_period;
        this.location = this.setDefaultLocation(location);
    }

    /**
     * change "heutige", "heutiges" and "heut" to "heute"
     * note:  diff for days are buggy, because dialog flow only gives the time for 0 o'clock and not the current time (negative with floor -> -1)
     * @param date_original
     * @param date
     * @returns {string}
     */
    getRightDateUtterance(date, date_original) {
        //get date without time
        const current_date = new Date((new Date() + "").substring(0, 10));
        const request_date = new Date((new Date(date) + "").substring(0, 10));
        let day_diff = utils_date.calculateDiffFrom2Dates(current_date, request_date, "days");
        if (day_diff === 0) {
            return today_string;
        } else {
            return date_original;
        }

    };

    /**
     * returns the weather utterance with the right grammatical article
     * @param weather
     * @returns {string}
     */
    setWeatherWithArticle(weather) {
        switch (weather) {
            case weather_report:
                return report_article + weather;
            case weather_forecast:
                return forecast_and_outlook_article + weather;
            case weather_outlook:
                return forecast_and_outlook_article + weather;
            default:
                return weather;
        }
    };


    /**
     * replace placeholder values in string with data form request_data
     * @param string
     * @returns {string}
     */
    insertRequestData(string) {
        return string.replace("$weather", this.weather)
            .replace("$date", this.date_original)
            .replace("$location", this.location);
    }

    /**
     * replace placeholder values in subtitle text with data form request_data
     * @param string
     * @returns {string}
     */
    insertRequestDataForSubtitle(string) {
        return string.replace("$weather", this.weather)
            .replace("$date", utils_date.getDateFormatted(this.date, custom_format))
            .replace("$location", this.location);

    }


    /**
     * set default value for weather if empty, else return the given weather
     *
     * @param weather
     * @returns {*}
     */
    setDefaultWeather(weather) {
        if (utils.isEmpty(weather)) {
            return default_weather;
        }
        return weather;
    }

    /**
     * set default value for date if empty, else return the given date
     *
     * @param date
     * @returns {string}
     */
    setDefaultDate(date) {
        if (utils.isEmpty(date)) {
            return new Date() + "";
        }
        return date;
    };


    /**
     * set date for today if date is empty, else return the given date
     *
     * @param date_original
     * @returns {string}
     */
    setDefaultDateOriginal(date_original) {
        if (utils.isEmpty(date_original)) {
            return default_date;
        }
        return date_original;
    };

    /**
     * set default value for location if empty, else return the given location
     *
     * @param location
     * @returns {string|*}
     */
    setDefaultLocation(location) {
        if (utils.isEmpty(location)) {
            return default_location;
        }
        return location;
    };


};

module.exports = requestData;