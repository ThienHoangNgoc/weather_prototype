const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const strings = require('./string');
const admin = require('firebase-admin');
const {Carousel, BrowseCarousel, BrowseCarouselItem, Image, Suggestions, Confirmation, SimpleResponse} = require('actions-on-google');
const SELECTION_KEY_1 = "selection_key_1";
const randomNG = require('./Utils');


process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();


exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({request, response});
    agent.requestSource = agent.ACTIONS_ON_GOOGLE;


    function welcome(agent) {
        agent.add(strings.general.welcome);
    }


    function weatherForecastDatePeriod(agent) {
        /* const testStartDate = agent.request_.body.queryResult.parameters['date-period'][0]['startDate'];
         const timePeriod = agent.request_.body.queryResult.outputContexts[0].parameters['date-period.original'];
         const locationCity = agent.request_.body.queryResult.outputContexts[0].parameters['geo-city.original'];*/
        const weather = agent.request_.body.queryResult.parameters['wetter.original'];
        const locationCity = agent.request_.body.queryResult.parameters['geo-city.original'];
        const timePeriod = agent.request_.body.queryResult.parameters['date-period'];
        const timePeriodOriginal = agent.request_.body.queryResult.parameters['date-period.original'];
        const suggestionsList = [
            'xd',
            'hi',
            'lol234'
        ]
        let conv = agent.conv();
        conv.ask('Suche ein Item aus');
        conv.ask(new BrowseCarousel({
            items: [
                new BrowseCarouselItem({
                    title: 'item #1',
                    url: 'https://www.reddit.com/r/OnePiece/',
                    description: 'item 1 description',
                    image: {
                        url: "https://i.imgur.com/SUtypB2.png",
                        accessibilityText: "test"
                    },
                    footer: 'item 1 footer'
                }),
                new BrowseCarouselItem({
                    title: 'item #2',
                    url: 'https://www.reddit.com/r/OnePiece/',
                    description: 'item 2 description',
                    image: new Image({
                        url: 'https://i.imgur.com/SUtypB2.png',
                        alt: ''
                    }),
                    footer: 'item 2 footer'
                }),


            ]
        }));
        conv.ask(new Suggestions(suggestionsList));
        agent.add(conv);

    }

    function incorrectTopicLastTimeIntent(agent) {
        let conv = agent.conv();
        conv.ask(strings.last_fallback[getRandomInt(strings.last_fallback.length)]);
        conv.ask(strings.general.available_topics);
        conv.ask(new Suggestions(strings.intent_suggestions));
        agent.add(conv);
    }


    let intentMap = new Map();
    intentMap.set(strings.intents.last_time_incorrect, incorrectTopicLastTimeIntent);
    intentMap.set(strings.intents.welcome, welcome);
    intentMap.set('weather_date_period_forecast', weatherForecastDatePeriod)
    agent.handleRequest(intentMap);
});


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
