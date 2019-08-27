const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');

const strings = require('./jsons/project_strings');
//intent handler
const welcome_handler = require('./intents/welcome/welcome');
const final_fallback_handler = require('./intents/fallback/incorrectTopicLastTime');
const normal_weather_handler = require('./intents/weather/normal_response/normal_weather_response_intent');
const normal_weather_follow_up_handler = require('./intents/weather/normal_response/follow_ups/normal_weather_response_follow_up');
const long_weather_handler = require('./intents/weather/long_response/long_weather_response_intent');

//intent names
const welcome_intent = strings.intents.welcome;
const final_fallback_intent = strings.intents.universal_fallback_final;
const normal_weather_intent = strings.intents.normal_weather_response;
const normal_weather_follow_up_intent = strings.intents.normal_weather_follow_up;
const long_weather_intent = strings.intents.long_weather_response;

// enables lib debugging statements
process.env.DEBUG = 'dialogflow:debug';

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {

    const agent = new WebhookClient({request, response});
    let intentMap = new Map();
    intentMap.set(welcome_intent, welcome_handler);
    intentMap.set(final_fallback_intent, final_fallback_handler);
    intentMap.set(normal_weather_intent, normal_weather_handler);
    intentMap.set(normal_weather_follow_up_intent, normal_weather_follow_up_handler);
    intentMap.set(long_weather_intent, long_weather_handler);
    agent.handleRequest(intentMap);

});
