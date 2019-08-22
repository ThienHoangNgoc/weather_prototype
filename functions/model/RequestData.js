'use strict';

const utils = require('../utils/utils');
const utils_date = require('../utils/utils_date');
const strings = require('./request_data_strings');


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

const key_word_1 = strings.date_period_utterance.key_word.version_1;
const key_word_2 = strings.date_period_utterance.key_word.version_2;
const key_word_3 = strings.date_period_utterance.key_word.version_3;

const standardized_1 = strings.date_period_utterance.standardized.version_1;
const standardized_2 = strings.date_period_utterance.standardized.version_2;
const standardized_3 = strings.date_period_utterance.standardized.version_3;

const article = strings.date_period_utterance.grammatical_article;


const custom_date_period_utterance_part = strings.custom_date_period_utterance_part;


const requestData = class RequestData {

    constructor(weather, date, date_utterance, date_period, date_period_utterance, custom_date_period, custom_date_period_utterance, location) {


        this.weather = this.setDefaultWeather(weather);
        this.weather = this.setWeatherWithArticle(this.weather);
        //set date values
        if (!utils.isEmpty(date_period)) {
            this.start_date = date_period['startDate'];
            this.end_date = date_period['endDate'];
            this.date_utterance = this.getRightDateUtteranceForDatePeriod(date_period_utterance);
            this.isDatePeriod = true;
        } else if (!utils.isEmpty(custom_date_period)) {
            this.setDateForCustomDatePeriod(custom_date_period, custom_date_period_utterance);
            this.isDatePeriod = true;
        } else {
            //else --> single date, and time-period (not date-period)
            //for a single date requests, end_date = start_date
            this.start_date = this.setDefaultDate(date);
            this.end_date = this.start_date;
            this.date_utterance = this.setDefaultDateUtterance(date_utterance);
            this.date_utterance = this.getRightDateUtteranceForDate(this.start_date, this.date_utterance);
            this.isDatePeriod = false;
        }
        this.isToday = this.checkIfDateIsToday(this.start_date);
        this.location = this.setDefaultLocation(location);

    }

    /**
     * change "heutige", "heutiges" and "heut" to "heute"
     * note:  diff for days are buggy, because dialog flow only gives the time for 0 o'clock and not the current time (negative with floor -> -1)
     * @param date_utterance
     * @param start_date
     * @returns {string}
     */

    getRightDateUtteranceForDate(start_date, date_utterance) {
        const current_date = utils_date.getDateWithoutTime(utils_date.getGMTNewDate());
        const request_date = utils_date.getDateWithoutTime(start_date);
        let day_diff = utils_date.calculateDiffFrom2Dates(current_date, request_date, "days");
        if (day_diff === 0) {
            return today_string;
        } else {
            return date_utterance;
        }
    };

    checkIfDateIsToday(start_date) {
        let currentDate = utils_date.getDateWithoutTime(utils_date.getGMTNewDate());
        let startDate = utils_date.getDateWithoutTime(start_date);
        console.log("currentDate: " + currentDate);
        console.log("startDate: " + startDate);
        return utils_date.calculateDiffFrom2Dates(currentDate, startDate, "days") === 0;
    }

    /**
     * standardize all date-period utterances for response
     * context: change nächste Woche to nächsten Woche, otherwise the response is not correct grammatically (German)
     * Todo: error case is missing
     * @param date_utterance
     * @returns {string}
     */
    getRightDateUtteranceForDatePeriod(date_utterance) {
        if (utils.containsString(date_utterance, strings.date_period_utterance.weekend)) {
            return date_utterance;
        }
        if (utils.containsString(date_utterance, key_word_1)) {
            if (utils.containsString(date_utterance, "Tag")) {
                let new_string = utils.standardizeString(date_utterance, key_word_1, standardized_1, "");
                return utils.standardizeString(new_string, "Tag", "Tagen", "den ");
            } else if (utils.containsString(date_utterance, "Wochen")) {
                return utils.standardizeString(date_utterance, key_word_1, standardized_1, "den ");
            } else {
                return utils.standardizeString(date_utterance, key_word_1, standardized_1, article);
            }
        } else if (utils.containsString(date_utterance, key_word_2)) {
            if (utils.containsString(date_utterance, "Tag")) {
                let new_string = utils.standardizeString(date_utterance, key_word_2, standardized_2, "");
                return utils.standardizeString(new_string, "Tag", "Tagen", "den ");
            } else if (utils.containsString(date_utterance, "Wochen")) {
                return utils.standardizeString(date_utterance, key_word_2, standardized_2, "den ");
            } else {
                return utils.standardizeString(date_utterance, key_word_2, standardized_2, article);
            }
        } else if (utils.containsString(date_utterance, key_word_3)) {
            return utils.standardizeString(date_utterance, key_word_3, standardized_3, "");
        }
    }


    setDateForCustomDatePeriod(custom_date_period, custom_date_period_utterance) {
        let currentDate = utils_date.getGMTNewDate();
        let date_number = custom_date_period['number'];
        let additional_date_period = custom_date_period['additional_date_period'];
        let start_date;
        let daysToAdd;
        if (utils.equalsString(additional_date_period, "Woche")) {
            if (currentDate.getDay() === 0) {
                daysToAdd = 1;
            } else {
                daysToAdd = currentDate.getDay() + 8 - (currentDate.getDay() * 2);
            }
            start_date = utils_date.addDays(currentDate, daysToAdd);
            this.start_date = start_date;
            this.end_date = utils_date.addDays(start_date, date_number * 7);
        } else if (utils.equalsString(additional_date_period, "Tag")) {
            start_date = utils_date.addDays(currentDate, 1);
            this.end_date = utils_date.addDays(start_date, date_number);
        } else {
            //TODO: fallback for month and year : no data for that (here or somewhere else) ?
            this.end_date = "";

        }
        this.date_utterance = custom_date_period_utterance_part + custom_date_period_utterance;
    }


    /**
     * returns the weather utterance with the right grammatical article
     * @param weather
     * @returns {string}
     */
    setWeatherWithArticle(weather) {
        switch (weather.toString()) {
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
            .replace("$date", this.date_utterance)
            .replace("$location", this.location);
    }

    /**
     * replace placeholder values in subtitle text with data form request_data
     * @param string
     * @returns {string}
     */
    insertRequestDataForSubtitle(string) {
        return string.replace("$weather", this.weather)
            .replace("$date", utils_date.getDateFormatted(this.start_date, custom_format))
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
            return utils_date.getGMTNewDate() + "";
        }
        return date;
    };


    /**
     * set date for today if date is empty, else return the given date
     *
     * @param date_utterance
     * @returns {string}
     */
    setDefaultDateUtterance(date_utterance) {
        if (utils.isEmpty(date_utterance)) {
            return default_date;
        }
        return date_utterance;
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