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

const custom_date_period_utterance_part = strings.custom_date_period_utterance_part;


const requestData = class RequestData {

    constructor(weather, date, date_utterance, date_period, date_period_utterance, custom_date_period, custom_date_period_utterance, location) {
        this.weather = this.setDefaultWeather(weather);
        this.weather = this.setWeatherWithArticle(this.weather);

        //set date values
        if (!utils.isEmpty(date_period)) {
            this.start_date = date_period['startDate'];
            this.end_date = date_period['endDate'];
            this.date_utterance = date_period_utterance;
            this.isDatePeriod = true;
        } else if (!utils.isEmpty(custom_date_period)) {
            this.setDateForCustomDatePeriod(custom_date_period, custom_date_period_utterance);
            this.isDatePeriod = true;
        } else {
            //for a single date requests, end_date = start_date
            this.start_date = this.setDefaultDate(date);
            this.end_date = this.start_date;
            this.date_utterance = this.setDefaultDateUtterance(date_utterance);
            this.date_utterance = this.getRightDateUtterance(this.start_date, this.date_utterance);
            this.isDatePeriod = false;
        }
        console.log("request_data weather: " + this.weather);
        console.log("request_data startDate: " + this.start_date);
        console.log("request_data endDate: " + this.end_date);
        console.log("request_data utterance: " + this.date_utterance);
        this.location = this.setDefaultLocation(location);
    }

    /**
     * change "heutige", "heutiges" and "heut" to "heute"
     * note:  diff for days are buggy, because dialog flow only gives the time for 0 o'clock and not the current time (negative with floor -> -1)
     * @param date_utterance
     * @param start_date
     * @returns {string}
     */
    getRightDateUtterance(start_date, date_utterance) {
        //get date without time
        const current_date = utils_date.getDateWithoutTime(new Date());
        const request_date = utils_date.getDateWithoutTime(start_date);
        let day_diff = utils_date.calculateDiffFrom2Dates(current_date, request_date, "days");
        if (day_diff === 0) {
            return today_string;
        } else {
            return date_utterance;
        }

    };


    setDateForCustomDatePeriod(custom_date_period, custom_date_period_utterance) {
        let currentDate = new Date();
        let daysToAdd;
        let date_number = custom_date_period['number'];
        let additional_date_period = custom_date_period['additional_date_period'];
        if (currentDate.getDay() === 0) {
            daysToAdd = 1;
        } else {
            daysToAdd = currentDate.getDay() + 8 - (currentDate.getDay() * 2);
        }

        let start_date = utils_date.addDays(currentDate, daysToAdd);
        this.start_date = start_date;

        if (utils.equalsString(additional_date_period, "Woche")) {
            this.end_date = utils_date.addDays(start_date, date_number * 7);
        } else if (utils.equalsString(additional_date_period, "Tag")) {
            this.end_date = utils_date.addDays(start_date, date_number);
        } else {
            //for error message
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
            return new Date() + "";
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