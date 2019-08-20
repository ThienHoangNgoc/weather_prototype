"use strict";

const utils = require('../utils/utils');
const weather_helper = require('./weather_helper');
const conv_strings = require('../jsons/normal_weather_response/normal_weather_response_conv_strings');
const strings = require('../jsons/normal_weather_response/normal_weather_response_strings');


const initial_response_list = conv_strings.weather_responses.initial;
const weather_string = strings.weather_entity_entries.weather;

const getWeatherResponse = (weather, date_original, date, location, weather_data) => {

};


const buildInitialWeatherResponse = (weather, date_original, date, location, weather_data) => {

};

module.exports = {getWeatherResponse};