'use strict';

const requestData = class RequestData {

    constructor(weather, date, date_original, date_period, date_period_original, custom_date_period, location) {
        this.weather = weather;
        this.date = date;
        this.date_original = date_original;
        this.date_period = date_period;
        this.date_period_original = date_period_original;
        this.custom_date_period = custom_date_period;
        this.location = location;


    }

};

module.exports = requestData;