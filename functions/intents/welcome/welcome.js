"use strict";

const strings = require('./welcome_conv_strings');
const {SimpleResponse} = require('actions-on-google');
const utils = require('../../utils/utils');

function welcome(agent) {
    if (agent.requestSource === agent.ACTIONS_ON_GOOGLE) {
        let conv = agent.conv();
        conv.ask(new SimpleResponse({
            speech: utils.getRandomArrayEntry(strings.welcome_response),
            text: utils.getRandomArrayEntry(strings.welcome_text)
        }));
        agent.add(conv);
    } else {
        agent.add(utils.getRandomArrayEntry(strings.welcome_response));
    }

}

module.exports = welcome;