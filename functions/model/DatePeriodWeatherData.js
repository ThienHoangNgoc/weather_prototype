'use strict';

const utils = require('../helper/utils/utils');
const utils_date = require('../helper/utils/utils_date');
const SingleDateWeatherData = require('SingleDateWeatherData');
const SingleDateWeatherDataDummy = require('SingleDateWeatherDataDummy');


const datePeriodWeatherData = class DatePeriodWeatherData {

    constructor(request_data) {
        this.averageDayTemp = "";
        this.averageNightTemp = "";
        this.averageWeatherCondition = "";
        this.averageRain = "";
        this.averageSunHours = "";
        this.setData(request_data);
    }

    setData = (request_data) => {
        let weather_data_list = [];
        let day_diff = utils_date.calculateDiffFrom2Dates(request_data.startDate, request_data.end_date, "days");
        if (day_diff < 14) {
            let averageDayTemp = 0;
            let averageNightTemp = 0;
            let averageRain = 0;
            let averageSunHours = 0;
            let weatherConditionList = [];
            weather_data_list = getWeatherDataList(request_data.startDate, day_diff);
            weather_data_list.forEach(function (item) {
                averageDayTemp += item.averageDayTemp;
                averageNightTemp += item.averageNightTemp;
                averageSunHours += item.sunHours;
                averageRain += item.rain;
                weatherConditionList.push(item.weatherCondition);
            });
            this.averageDayTemp = averageDayTemp / weather_data_list.length;
            this.averageNightTemp = averageNightTemp / weather_data_list.length;
            this.averageWeatherCondition = utils.getMostFrequentValueInArray(weatherConditionList);
            this.averageRain = averageRain / weather_data_list.length;
            this.averageSunHours = averageSunHours / weather_data_list.length;
        }
    };


};

/**
 * returns list of SingleDateWeatherData
 * @param start_date
 * @param day_diff
 * @returns {Array}
 */
const getWeatherDataList = (start_date, day_diff) => {
    let list = [];

    //day_diff = x, actual days = x + 1
    for (let index = 0; index <= day_diff; index++) {
        list.push(getWeatherDataBasedOnDate(utils_date.addDays(start_date, index)));
    }
    return list;
};

/**
 * TODO: gets a Weather.json based on given date and returns a SingleDateWeatherData
 * Generates a SingleDateWeatherDataDummy
 * @param date
 */
const getWeatherDataBasedOnDate = (date) => {
    return new SingleDateWeatherData(new SingleDateWeatherDataDummy());
};


module.exports = datePeriodWeatherData;