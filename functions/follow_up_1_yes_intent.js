"use strict";
const {Suggestions} = require('actions-on-google');

const strings = require('./jsons/strings');
const responses = require('./jsons/conv_strings');
const utils = require('./utils/utils');


const weatherFollowUpYes = (agent) => {
    let conv = agent.conv();
    conv.ask(responses.weather_follow_up.follow_up_1_yes[utils.getRandomInt(responses.weather_follow_up.follow_up_1_yes.length)]);
    conv.ask(new Suggestions(responses.weather_follow_up.more_info_suggestions));
    agent.add(conv);
    agent.context.set({name: strings.contexts.yes_more_info, lifespan: 5, parameter: {}});
};

module.exports = weatherFollowUpYes;