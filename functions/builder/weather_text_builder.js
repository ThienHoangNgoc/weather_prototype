/*
"use strict";

const strings = require('../jsons/strings');
const utils = require('../utils/utils');
const response_strings = require('../jsons/conv_strings');

/!*const getDateText = (text) => {
    let date_text;
    if (utils.stringIsInArray(text, strings.type_of_today)) {
        date_text = strings.date_type.today;
    } else {
        date_text = text;
    }
    return date_text;
};*!/

/!*
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
*!/

//get final response for "weather"
const getWeatherResponse = (weather, date, location, weatherObj) => {
    let responseList = [];

    responseList.push(`Das ${weather} für ${date} in ${location} sieht wie folgt aus: `
        + genericWeatherResponseBuilder(true, true, false, weatherObj));

    responseList.push(`In ${location} wird es ${date} tagsüber nochmal sommerlich warm mit ${weatherObj.dayMIN} bis ${weatherObj.dayMAX} Grad.`
        + genericWeatherResponseBuilder(false, true, false, weatherObj));

    responseList.push(`${utils.firstLetterUpperCase(date)} erreichen tagsüber in ${location} die maximalen Werte bis zu ${weatherObj.dayMAX} Grad. `
        + genericWeatherResponseBuilder(false, true, false, weatherObj));

    responseList.push(`${utils.firstLetterUpperCase(date)} werden tagsüber in ${location} Werte zwischen ${weatherObj.dayMIN} und ${weatherObj.dayMAX} Grad erreicht.`
        + genericWeatherResponseBuilder(false, true, false, weatherObj));

    return responseList;
};

//get final response for "weather forecast" and "weather outlook"
const getWeatherForecastAndOutlookResponse = (weather, date, location, weatherObj) => {
    let responseList = [];
    responseList.push(`Die ${weather} für ${location} sieht ${date} folgendermaßen aus: ` + genericWeatherResponseBuilder(true, true, true, weatherObj));
    return responseList;
};

//get final response for "weather report"
const getWeatherReportResponse = (weather, date, location, weatherObj) => {
    let responseList = [];
    responseList.push(`Der ${weather} für ${location} sieht ${date} folgendermaßen aus: ` + genericWeatherResponseBuilder(true, true, true, weatherObj));
    responseList.push(`Für ${location} sieht der ${weather} ${date} so aus: ` + genericWeatherResponseBuilder(true, true, true, weatherObj));
    responseList.push(`Hier der ${weather} für ${date}: ` + genericWeatherResponseBuilder(true, true, true, weatherObj));
    return responseList;
};



const weather_card_text_builder = (weatherObj) => {
    const lineBreaks = "  \n";
    let maxValue = weatherObj.dayMAX + "°";
    let minValue = weatherObj.nightMIN + "°";
    let rainProbability = weatherObj.rain + " %";
    let sunHours = weatherObj.sunHours;
    return strings.emoji.maxValue + stringBold(strings.basic_card_label.maxValue) + maxValue + lineBreaks +
        strings.emoji.minValue + stringBold(strings.basic_card_label.minValue) + minValue + lineBreaks +
        strings.emoji.rainProb + stringBold(strings.basic_card_label.rainProb) + rainProbability + lineBreaks +
        strings.emoji.sunHours + stringBold(strings.basic_card_label.sunHours) + sunHours;
};

//String cant have spaces
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



module.exports = {
    getWeatherResponse,
    getWeatherForecastAndOutlookResponse,
    getWeatherReportResponse,
    getTypeOfWeather,
    getDateText,
    weather_card_text_builder
};*/
