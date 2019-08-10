"use strict";

const strings = require('./strings');
const utils = require('./Utils');
const respons_strings = require('./response_strings')

const getDateText = (text) => {
    let date_text;
    if (utils.compareStringWithArray(text, [strings.type_of_today])) {
        date_text = strings.date_type.today;
    } else {
        date_text = text;
    }
    return date_text;
};

const getTypeOfWeather = (weather) => {
    let weather_type;
    if (utils.equalsString(weather.toLowerCase(), strings.weather_type.short.weather) || utils.equalsString(weather.toLowerCase(), "")) {
        weather_type = strings.weather_type.response.weather;
    } else if (utils.containsString(weather.toLowerCase(), strings.weather_type.short.outlook)) {
        weather_type = strings.weather_type.response.outlook;
    } else if (utils.containsString(weather.toLowerCase(), strings.weather_type.short.report)) {
        weather_type = strings.weather_type.response.report;
    } else if (utils.containsString(weather.toLowerCase(), strings.weather_type.short.forecast)) {
        weather_type = strings.weather_type.response.forecast;
    }
    return weather_type;
};

//Wetter
const getWeatherResponse = (weather, date, location) => {
    let responseList = [];
    responseList.push(`Das ${weather} für ${date} in ${location} sieht wie folgt aus: ` + genericWeatherResponseBuilder());
    responseList.push(`In ${location} werden es ${date} tagsüber bis zu 30 Grad und. `);
    responseList.push(`${utils.firstLetterUpperCase(date)} erreichen tagsüber in ${location} die maximalen Werte bis zu 40 Grad`);
    responseList.push(`${utils.firstLetterUpperCase(date)} ist es in ${location} stark bewölkt. Ab und zu scheint auch die Sonne.`);
    return responseList;
};

//Wettervorhersage und Wetterprognose
const getWeatherForecastAndOutlookResponse = (weather, date, location) => {
    let responseList = [];
    responseList.push(`Die ${weather} für ${location} sieht ${date} folgendermaßen aus: `);
    return responseList;
};

//Wetterbericht
const getWeatherReportResponse = (weather, date, location) => {
    let responseList = [];
    responseList.push(`Der ${weather} für ${location} sieht ${date} folgendermaßen aus: ` + genericWeatherResponseBuilder());
    responseList.push(`Für ${location} sieht der ${weather} ${date} so aus: ` + genericWeatherResponseBuilder());
    responseList.push(`Hier der ${weather} für ${date}: ` + genericWeatherResponseBuilder());
    return responseList;
}

const replaceString = (string, oldString, newString) => {
    if (utils.isString(string)) {
        return string.replace(oldString, newString);
    }
    return false;
};

const setRandomDegreeValues = (string) => {
    let dayMAX = utils.getRandomIntInRange(23, 40);
    let dayMIN = dayMAX - 5;
    let nightMAX = utils.getRandomIntInRange(10, 18);
    let nightMIN = nightMAX - 3;
    if (utils.containsString(string, "dayMAX") || utils.containsString(string, "nightMAX")) {
        string = string.replace("dayMAX", dayMAX)
        string = string.replace("dayMIN", dayMIN);
        string = string.replace("nightMAX", nightMAX)
        string = string.replace("nightMIN", nightMIN)
    }
    return string;
};

const genericWeatherResponseBuilder = () => {

    let day_time_list = respons_strings.generic_weather_responses.day_time;
    let night_time_list = respons_strings.generic_weather_responses.night_time;
    let general_list = respons_strings.generic_weather_responses.general;
    let rain_list = respons_strings.generic_weather_responses.rain;

    return setRandomDegreeValues(day_time_list[utils.getRandomArrayEntry(day_time_list)]) + " " +
        setRandomDegreeValues(night_time_list[utils.getRandomArrayEntry(night_time_list)]) + " " +
        general_list[utils.getRandomArrayEntry(general_list)] + " " +
        rain_list[utils.getRandomArrayEntry(day_time_list)];
};

module.exports = {
    getWeatherResponse,
    getWeatherForecastAndOutlookResponse,
    getWeatherReportResponse,
    getTypeOfWeather,
    getDateText
};