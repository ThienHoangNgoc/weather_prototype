"use strict";

const responses = require('../jsons/response_strings');
const strings = require('../jsons/strings');
const utils = require('../utils/Utils');
const {Suggestions} = require('actions-on-google');

function incorrectTopicLastTime(agent) {
    let conv = agent.conv();
    conv.ask(responses.last_fallback.responses[utils.getRandomInt(responses.last_fallback.responses.length)]);
    conv.ask(responses.last_fallback.hint_for_available_topics);
    conv.ask(new Suggestions(strings.topic_suggestions));
    agent.add(conv);
}

module.exports = incorrectTopicLastTime;
