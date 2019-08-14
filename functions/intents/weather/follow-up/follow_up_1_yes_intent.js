"use strict";
const {Suggestions} = require('actions-on-google');

const strings = require('../../../jsons/strings');


const weatherFollowUpYes = (agent) => {
    //add strings to JSON
    let conv = agent.conv();
    conv.ask("Alles klar! Zu was willst du mehr erfahren?");
    conv.ask(new Suggestions("Sonnenstunden", "Regen", "Andere"));
    agent.add(conv);
    agent.context.set({name: strings.contexts.yes_more_info, lifespan: 5, parameter: {}});
};

module.exports = weatherFollowUpYes;