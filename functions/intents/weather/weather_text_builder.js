"use strict";

const strings = require('../../jsons/strings');
const utils = require('../../utils/Utils');
const response_strings = require('../../jsons/response_strings');

const getDateText = (text) => {
    let date_text;
    if (utils.stringIsInArray(text, strings.type_of_today)) {
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

    responseList.push(setRandomDegreeValues(`${utils.firstLetterUpperCase(date)} erreichen tagsüber in ${location} die maximalen Werte bis zu 40 Grad.`
        + genericWeatherResponseBuilder(false, true, true, true)));

    responseList.push(setRandomDegreeValues(`${utils.firstLetterUpperCase(date)} werden tagsüber in ${location} Werte zwischen dayMIN und dayMAX Grad erreicht.`
        + genericWeatherResponseBuilder(false, true, true, true)));

    return responseList;
};

//Wettervorhersage und Wetterprognose
const getWeatherForecastAndOutlookResponse = (weather, date, location) => {
    let responseList = [];
    responseList.push(`Die ${weather} für ${location} sieht ${date} folgendermaßen aus: ` + genericWeatherResponseBuilder(true, true, true, true));
    return responseList;
};

//Wetterbericht
const getWeatherReportResponse = (weather, date, location) => {
    let responseList = [];
    responseList.push(`Der ${weather} für ${location} sieht ${date} folgendermaßen aus: ` + genericWeatherResponseBuilder(true, true, true, true));
    responseList.push(`Für ${location} sieht der ${weather} ${date} so aus: ` + genericWeatherResponseBuilder(true, true, true, true));
    responseList.push(`Hier der ${weather} für ${date}: ` + genericWeatherResponseBuilder(true, true, true, true));
    return responseList;
};

const replaceString = (string, oldString, newString) => {
    if (utils.isString(string)) {
        return string.replace(oldString, newString);
    }
    return "";
};

const setRandomDegreeValues = (string) => {
    let dayMAX = utils.getRandomIntInRange(28, 40);
    let dayMIN = dayMAX - 5;
    let nightMAX = utils.getRandomIntInRange(18, 20);
    let nightMIN = nightMAX - 3;
    if (utils.containsString(string, "dayMAX") || utils.containsString(string, "nightMAX")) {
        string = replaceString(string, "dayMAX", dayMAX);
        string = replaceString(string, "dayMIN", dayMIN);
        string = replaceString(string, "nightMAX", nightMAX);
        string = replaceString(string, "nightMIN", nightMIN)
    }
    return string;
};


const weather_card_text_builder = () => {
    const lineBreaks = "  \n";
    let maxValue = utils.getRandomIntInRange(28, 40) + "°";
    let minValue = utils.getRandomIntInRange(18, 20) + "°";
    let rainProbability = utils.getRandomIntInRange(0, 40) + " %";
    let sunHours = utils.getRandomIntInRange(4, 9);
    return strings.emoji.maxValue + stringBold(strings.basic_card_label.maxValue) + maxValue + lineBreaks +
        strings.emoji.minValue + stringBold(strings.basic_card_label.minValue) + minValue + lineBreaks +
        strings.emoji.rainProb + stringBold(strings.basic_card_label.rainProb) + rainProbability + lineBreaks +
        strings.emoji.sunHours + stringBold(strings.basic_card_label.sunHours) + sunHours;
};

const stringBold = (string) => {
    return "__" + string + "__ ";
};

const stringEmphasis = (string) => {
    return "*" + string + "* ";
};

const stringStrong = (string) => {
    return "**" + string + "** ";
};

const stringStrongEmphasis = (string) => {
    return "___" + string + "___ "
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
                genericResponseList = response_strings.generic_weather_responses.day_time;
                response = setRandomDegreeValues(genericResponseList[utils.getRandomArrayEntry(genericResponseList)]);
                break;
            case "night":
                genericResponseList = response_strings.generic_weather_responses.night_time;
                response = setRandomDegreeValues(genericResponseList[utils.getRandomArrayEntry(genericResponseList)]);
                break;
            case "general":
                genericResponseList = response_strings.generic_weather_responses.general;
                response = genericResponseList[utils.getRandomArrayEntry(genericResponseList)];
                break;
            case "rain":
                genericResponseList = response_strings.generic_weather_responses.rain;
                response = genericResponseList[utils.getRandomArrayEntry(genericResponseList)];
                break;
            default:
                response = "type not defined.";
                break;
        }
    } else {
        response = response_strings.debug_error.error_1 + "getGenericWeatherResponseByType - type is not a string."
    }
    return response;

};
module.exports = {
    getWeatherResponse,
    getWeatherForecastAndOutlookResponse,
    getWeatherReportResponse,
    getTypeOfWeather,
    getDateText,
    getGenericWeatherResponseByType,
    weather_card_text_builder
};