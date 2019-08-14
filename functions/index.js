const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');

const strings = require('./jsons/strings');

//intent functions
const weather_function = require('./intents/weather/weather_intent');
const welcome_function = require('./intents/welcome');
const incorrect_topic_last_time_function = require('./intents/incorrectTopicLastTime');
const weather_follow_up_1 = require('./intents/weather/follow-up/follow_up_1_yes_intent');

// enables lib debugging statements
process.env.DEBUG = 'dialogflow:debug';

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {

    const agent = new WebhookClient({request, response});
    let intentMap = new Map();
    intentMap.set(strings.intents.last_time_incorrect, incorrect_topic_last_time_function);
    intentMap.set(strings.intents.welcome, welcome_function);
    intentMap.set(strings.intents.weather, weather_function);
    intentMap.set(strings.intents.additional_weather_yes, weather_follow_up_1);
    agent.handleRequest(intentMap);

})
;
