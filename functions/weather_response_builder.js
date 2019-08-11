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

    responseList.push(`Das ${weather} für ${date} in ${location} sieht wie folgt aus: `
        + genericWeatherResponseBuilder(true, true, true, true));

    responseList.push(setRandomDegreeValues(`In ${location} wird es ${date} tagsüber nochmal sommerlich warm mit dayMIN bis dayMAX Grad.`
        + genericWeatherResponseBuilder(false, true, true, true)));

    responseList.push(setRandomDegreeValues(`${utils.firstLetterUpperCase(date)} erreichen tagsüber in ${location} die maximalen Werte bis zu 40 Grad`
        + genericWeatherResponseBuilder(false, true, true, true)));

    responseList.push(setRandomDegreeValues(`${utils.firstLetterUpperCase(date)} werden tagsüber in ${location} Werte zwischen dayMIN und dayMAX Grad erreicht.`
        + genericWeatherResponseBuilder(false, true, true, true)));

    return responseList;
};

//Wettervorhersage und Wetterprognose
const getWeatherForecastAndOutlookResponse = (weather, date, location) => {
    let responseList = [];
    responseList.push(`Die ${weather} für ${location} sieht ${date} folgendermaßen aus: ` + genericWeatherResponseBuilder());
    return responseList;
};

//Wetterbericht
const getWeatherReportResponse = (weather, date, location) => {
    let responseList = [];
    responseList.push(`Der ${weather} für ${location} sieht ${date} folgendermaßen aus: ` + genericWeatherResponseBuilder());
    responseList.push(`Für ${location} sieht der ${weather} ${date} so aus: ` + genericWeatherResponseBuilder());
    responseList.push(`Hier der ${weather} für ${date}: ` + genericWeatherResponseBuilder());
    return responseList;
};

const replaceString = (string, oldString, newString) => {
    if (utils.isString(string)) {
        return string.replace(oldString, newString);
    }
    return "";
};

const setRandomDegreeValues = (string) => {
    let dayMAX = utils.getRandomIntInRange(23, 40);
    let dayMIN = dayMAX - 5;
    let nightMAX = utils.getRandomIntInRange(10, 18);
    let nightMIN = nightMAX - 3;
    if (utils.containsString(string, "dayMAX") || utils.containsString(string, "nightMAX")) {
        string = replaceString(string, "dayMAX", dayMAX);
        string = replaceString(string, "dayMIN", dayMIN);
        string = replaceString(string, "nightMAX", nightMAX);
        string = replaceString(string, "nightMIN", nightMIN)
    }
    return string;
};

const genericWeatherResponseBuilder = (day, night, general, rain) => {
    let final_response = "";
    if (day) {
        final_response += getGenericWeatherResponseByType("day");
    }
    if (night) {
        final_response += getGenericWeatherResponseByType("night");
    }
    if (general) {
        final_response += getGenericWeatherResponseByType("general");
    }
    if (rain) {
        final_response += getGenericWeatherResponseByType("rain");
    }
    return final_response;
};

const getGenericWeatherResponseByType = (type) => {
    let genericResponseList;
    let response;
    if (utils.isString(type)) {
        switch (type) {
            case "day":
                genericResponseList = respons_strings.generic_weather_responses.day_time;
                response = setRandomDegreeValues(genericResponseList[utils.getRandomArrayEntry(genericResponseList)]);
                break;
            case "night":
                genericResponseList = respons_strings.generic_weather_responses.night_time;
                response = setRandomDegreeValues(genericResponseList[utils.getRandomArrayEntry(genericResponseList)]);
                break;
            case "general":
                genericResponseList = respons_strings.generic_weather_responses.general;
                response = genericResponseList[utils.getRandomArrayEntry(genericResponseList)];
                break;
            case "rain":
                genericResponseList = respons_strings.generic_weather_responses.rain;
                response = genericResponseList[utils.getRandomArrayEntry(genericResponseList)];
                break;
            default:
                response = "type not defined.";
                break;
        }
    } else {
        response = respons_strings.default_error.error_1 + "getGenericWeatherResponseByType - type is not a string."
    }
    return response;

};
module.exports = {
    getWeatherResponse,
    getWeatherForecastAndOutlookResponse,
    getWeatherReportResponse,
    getTypeOfWeather,
    getDateText,
    getGenericWeatherResponseByType
};