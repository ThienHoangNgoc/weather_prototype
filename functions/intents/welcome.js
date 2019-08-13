"use strict";

const responses = require('../jsons/response_strings');

function welcome(agent) {
    agent.add(responses.welcome.welcome);
}

module.exports = welcome;