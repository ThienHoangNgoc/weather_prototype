"use strict";

const utils = require('../utils/utils');
const strings = require('../jsons/weather_strings');
const weather_states = [strings.weather_state.cloudy,
    strings.weather_state.slightly_cloudy,
    strings.weather_state.mostly_cloudy,
    strings.weather_state.rainy,
    strings.weather_state.rainstorm,];
const sunny = strings.weather_state.sunny;
const clear = strings.weather_state.clear;
const tempest = strings.weather_state.tempest;

const hours = new Date().getHours();

const weather = class Weather {

    //isSunny and tempest isDay --> in order to create dummy values
    constructor() {
        this.isSunny = utils.getRandomBoolean();
        // Day 8 - 19 Uhr, Night 20 - 7 Uhr
        this.isDay = !(hours < 8 || hours > 19);
        if (this.isSunny) {
            this.tempest = false;
            this.sunHours = utils.getRandomIntInRange(8, 12);
            this.rain = utils.getRandomIntInRange(3, 25);
            this.dayMAX = utils.getRandomIntInRange(28, 40);
            this.dayMIN = this.dayMAX - 5;
            this.nightMAX = utils.getRandomIntInRange(18, 20);
            this.nightMIN = this.nightMAX - 3;
            if (this.isDay) {
                this.weatherState = sunny;
            } else {
                this.weatherState = clear;
            }
        } else {
            this.tempest = utils.getRandomBoolean();
            this.sunHours = utils.getRandomIntInRange(2, 5);
            this.rain = utils.getRandomIntInRange(50, 90);
            this.dayMAX = utils.getRandomIntInRange(20, 27);
            this.dayMIN = this.dayMAX - 5;
            this.nightMAX = utils.getRandomIntInRange(10, 18);
            this.nightMIN = this.nightMAX - 3;
            if (this.tempest) {
                this.weatherState = tempest;
            } else {
                this.weatherState = utils.getRandomArrayEntry(weather_states);
            }
        }
        if (this.isDay === true) {
            this.currentTemp = utils.getRandomIntInRange(this.dayMAX, this.dayMIN);
        } else {
            this.currentTemp = utils.getRandomIntInRange(this.nightMAX, this.nightMIN);
        }
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
            .replace("$weatherState", this.weatherState);
    }

};

module.exports = weather;