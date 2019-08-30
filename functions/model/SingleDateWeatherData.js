"use strict";

const SingleDateWeatherDataDummy = require('SingleDateWeatherDataDummy');

const singleDateWeatherData = class SingleDateWeatherData {
    /**
     *
     * note: might add date as key
     * TODO: gets a Weather.json based on given date and returns a SingleDateWeatherData

     * @param weather_data
     */
    constructor(date) {
        this.currentTemp = "";
        this.dayMAX = "";
        this.dayMIN = "";
        this.nightMAX = "";
        this.nightMIN = "";
        this.averageDayTemp = "";
        this.averageNightTemp = "";
        this.weatherCondition = "";
        this.sunHours = "";
        this.rain = "";
        this.setData(date);
    }

    setData = (date) => {
        //TODO: getWeatherDataBasedOnDate(date)
        //instead generate a dummy for the time being
        const weather_data_dummy = new SingleDateWeatherDataDummy();
        this.currentTemp = weather_data_dummy.currentTemp;
        this.dayMAX = weather_data_dummy.dayMAX;
        this.dayMIN = weather_data_dummy.dayMIN;
        this.nightMAX = weather_data_dummy.nightMAX;
        this.nightMIN = weather_data_dummy.nightMIN;
        this.averageDayTemp = weather_data_dummy.averageDayTemp;
        this.averageNightTemp = weather_data_dummy.averageNightTemp;
        this.weatherCondition = weather_data_dummy.weatherCondition;
        this.sunHours = weather_data_dummy.sunHours;
        this.rain = weather_data_dummy.rain;

    };


    /**
     * replace placeholder values in string with data form weather_data
     * @param response
     * @param weather_data
     * @returns {*}
     */
    insertWeatherData(string) {
        return string.replace("$dayMAX", this.dayMAX)
            .replace("$dayMIN", this.dayMIN)
            .replace("$nightMAX", this.nightMAX)
            .replace("$nightMIN", this.nightMIN)
            .replace("$sunV", this.sunHours)
            .replace("$rainV", this.rain)
            .replace("$currentTemp", this.currentTemp)
            .replace("$weatherState", this.weatherCondition)
            .replace("$averageDay", this.averageDayTemp)
            .replace("$averageNight", this.averageNightTemp)
    }

};

module.exports = singleDateWeatherData;