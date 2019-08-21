"use strict";

const utils = require('../../../utils/utils');
const strings = require('./strings/normal_weather_response_strings');
const conv_strings = require('./strings/normal_weather_response_conv_strings');
const weather_helper = require('../../../helper/weather/weather_helper');
const card_builder = require('../../../helper/card_builder/info_card_builder');
const {Suggestions} = require('actions-on-google');

