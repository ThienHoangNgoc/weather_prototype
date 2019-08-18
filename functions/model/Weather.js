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
        this.dayMAX = utils.getRandomIntInRange(28, 40);
        this.dayMIN = this.dayMAX - 5;
        this.nightMAX = utils.getRandomIntInRange(18, 20);
        this.nightMIN = this.nightMAX - 3;
        this.isSunny = utils.getRandomBoolean();

        // Day 8 - 19 Uhr, Night 20 - 7 Uhr
        this.isDay = !(hours < 8 || hours > 19);
        if (this.isDay === true) {
            this.currentTemp = utils.getRandomIntInRange(this.dayMAX, this.dayMIN);
        } else {
            this.currentTemp = utils.getRandomIntInRange(this.nightMAX, this.nightMIN);
        }

        if (this.isSunny) {
            this.tempest = false;
            this.sunHours = utils.getRandomIntInRange(8, 12);
            this.rain = utils.getRandomIntInRange(3, 25);
            if (this.isDay) {
                this.weatherState = sunny;
            } else {
                this.weatherState = clear;
            }
        } else {
            this.tempest = utils.getRandomBoolean();
            this.sunHours = utils.getRandomIntInRange(2, 5);
            this.rain = utils.getRandomIntInRange(50, 90);
            if (this.tempest) {
                this.weatherState = tempest;
            } else {
                this.weatherState = utils.getRandomArrayEntry(weather_states);
            }
        }


    }

};

module.exports = weather;