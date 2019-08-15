"use strict";

const utils = require('../utils/utils');

const weather = class Weather {


    constructor() {
        this.isSunny = utils.getRandomInt(2) === 1;
        this.dayMAX = utils.getRandomIntInRange(28, 40);
        this.dayMIN = this.dayMAX - 5;
        this.nightMAX = utils.getRandomIntInRange(18, 20);
        this.nightMIN = this.nightMAX - 3;
        if (this.isSunny) {
            this.sunHours = utils.getRandomIntInRange(8, 12);
            this.rain = utils.getRandomIntInRange(3, 25);
        } else {
            this.sunHours = utils.getRandomIntInRange(2, 5);
            this.rain = utils.getRandomIntInRange(50, 90);
            this.tempest = utils.getRandomInt(2) === 1;
        }


    }


};

module.exports = weather;