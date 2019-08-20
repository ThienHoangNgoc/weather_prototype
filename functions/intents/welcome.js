"use strict";

const responses = require('../jsons/conv_strings');

function welcome(agent) {
    agent.add(responses.welcome.welcome);
}

module.exports = welcome;