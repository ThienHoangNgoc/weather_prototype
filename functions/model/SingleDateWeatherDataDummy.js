'use strict';

const utils = require('../helper/utils/utils');
const utils_date = require('../helper/utils/utils_date');
const strings = require('../jsons/weather_strings');

const currentDateHours = utils_date.getGMTNewDate().getHours();
const weather_states = [strings.weather_state.cloudy,
    strings.weather_state.slightly_cloudy,
    strings.weather_state.mostly_cloudy,
    strings.weather_state.rainy,
    strings.weather_state.rainstorm];

const sunny = strings.weather_state.sunny;
const clear = strings.weather_state.clear;
const tempest = strings.weather_state.tempest;

const singleDateWeatherDataDummy = class WeatherDummy {


    /**
     * isSunny,isDay,tempest,sunHours, rain, dayMax, dayMIN, nightMAX, nightMIN, weatherCondition, currentTemp, averageDayTemp, averageNightTemp
     */
    constructor() {
        this.isSunny = utils.getRandomBoolean();
        //depending on the current time of the day, set this parameter to true or false
        this.isDay = !(currentDateHours < 8 || currentDateHours > 19);
        if (this.isSunny) {
            this.tempest = false;
            this.sunHours = utils.getRandomIntInRange(8, 12);
            this.rain = utils.getRandomIntInRange(3, 25);
            this.dayMAX = utils.getRandomIntInRange(28, 40);
            this.dayMIN = this.dayMAX - 5;
            this.nightMAX = utils.getRandomIntInRange(18, 20);
            this.nightMIN = this.nightMAX - 3;
            if (this.isDay) {
                this.weatherCondition = sunny;
            } else {
                this.weatherCondition = clear;
            }
        } else {
            this.tempest = utils.getRandomBoolean();
            this.sunHours = utils.getRandomIntInRange(2, 5);
            this.rain = utils.getRandomIntInRange(50, 90);
            this.dayMAX = utils.getRandomIntInRange(15, 23);
            this.dayMIN = this.dayMAX - 5;
            this.nightMAX = utils.getRandomIntInRange(10, 13);
            this.nightMIN = this.nightMAX - 3;
            if (this.tempest) {
                this.weatherCondition = tempest;
            } else {
                this.weatherCondition = utils.getRandomArrayEntry(weather_states);
            }
        }
        if (this.isDay === true) {
            this.currentTemp = utils.getRandomIntInRange(this.dayMAX, this.dayMIN);
        } else {
            this.currentTemp = utils.getRandomIntInRange(this.nightMAX, this.nightMIN);
        }
        this.averageDayTemp = Math.floor((this.dayMAX + this.dayMIN) / 2);
        this.averageNightTemp = Math.floor((this.nightMAX + this.nightMIN) / 2);
    }


};


module.exports = singleDateWeatherDataDummy;