"use strict";

const strings = require('./strings');
const utils = require('./Utils');


const getTypeOfWeather = (weather) => {
    let weather_type;
    if (utils.compareString(weather.toLowerCase(), strings.weather_type.short.weather) || utils.compareString(weather.toLowerCase(), "")) {
        weather_type = strings.weather_type.response.weather;
    } else if (utils.containsString(weather.toLowerCase(), strings.weather_type.short.forecast)) {
        weather_type = strings.weather_type.response.forecast;
    } else if (utils.containsString(weather.toLowerCase(), strings.weather_type.short.report)) {
        weather_type = strings.weather_type.response.report;
    }
    return weather_type;
}

const getDateText = (text) => {
    let date_text;
    if (utils.compareStringWithArray(text, [strings.type_of_today])) {
        date_text = strings.date_type.today;
    } else {
        date_text = text;
    }
    return date_text;
}

const getWeatherResponse = (weather, date, location) => {
    let responseList = [];
    responseList.push(`Das ${weather} für ${date} in ${location} sieht wie folgt aus:`);
    responseList.push(`In ${location} werden es ${date} tagsüber bis zu 30 Grad und. `);
    responseList.push(`${date} ist es in ${location} stark bewöklt. Ab und zu scheint auch die Sonne.`);
    return responseList;
};

const getWeatherForecastAndReportResponse = (weather, date, location) => {
    let responseList = [];
    responseList.push(`Die ${weather} für ${location} sieht ${date} folgendermaßen aus:`);
    return responseList;

}

module.exports = {getWeatherResponse, getWeatherForecastAndReportResponse, getTypeOfWeather, getDateText};