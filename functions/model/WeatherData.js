"use strict";

const weatherData = class WeatherData {



    constructor(weather_data) {
        this.currentTemp = weather_data.currentTemp;
        this.dayMAX = weather_data.dayMAX;
        this.dayMIN = weather_data.dayMIN;
        this.nightMAX = weather_data.nightMAX;
        this.nightMIN = weather_data.nightMIN;
        this.averageDayTemp = weather_data.averageDayTemp;
        this.averageNightTemp = weather_data.averageNightTemp;
        this.weatherCondition = weather_data.weatherCondition;
        this.sunHours = weather_data.sunHours;
        this.rain = weather_data.rain;

    }

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

module.exports = weatherData;