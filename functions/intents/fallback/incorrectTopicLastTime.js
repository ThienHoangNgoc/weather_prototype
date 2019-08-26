"use strict";

const conv_strings = require('./strings/fallback_conv_strings');
const strings = require('./strings/fallback_strings');
const utils = require('../../helper/utils/utils');
const response_helper = require('../../helper/response_helper');
const {Suggestions, SimpleResponse} = require('actions-on-google');

const response_list = conv_strings.responses;
const hint_text = conv_strings.text.hint;
const suggestion_list = strings.suggestions.list;
const suggestion_quit = strings.suggestions.quit;

function universalFallbackFinal(agent) {
    let conv = agent.conv();
    conv.ask(new SimpleResponse({
        speech: utils.getRandomArrayEntry(response_list),
        text: hint_text
    }));
    conv.ask(new Suggestions(response_helper.getRandomSuggestionsList(suggestion_list, suggestion_quit)));
    agent.add(conv);
}

module.exports = universalFallbackFinal;
