const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');


//intent functions
const long_weather_handler = require('./intents/weather/long_response/long_weather_response_intent');
const normal_weather_handler = require('./intents/weather/normal_response/normal_weather_response_intent')
const welcome_function = require('./intents/welcome');

// enables lib debugging statements
process.env.DEBUG = 'dialogflow:debug';

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {

    const agent = new WebhookClient({request, response});
    let intentMap = new Map();
    intentMap.set("welcome", welcome_function);
    intentMap.set("long_weather_response", long_weather_handler);
    intentMap.set("normal_weather_response", normal_weather_handler);
    agent.handleRequest(intentMap);

})
;
