const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');

const strings = require('./string');
const utils = require('./Utils');

const {Carousel, BrowseCarousel, BrowseCarouselItem, Image, Suggestions, Confirmation, SimpleResponse} = require('actions-on-google');
const {Card, Suggestion} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements


exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({request, response});
    agent.requestSource = agent.ACTIONS_ON_GOOGLE;


    function welcome(agent) {
        agent.add(strings.general.welcome);
    }

    function weather(agent) {
        const weather = agent.request_.body.queryResult.parameters['weather'];
        const date = agent.request_.body.queryResult.parameters['date'];
        const temperature = agent.request_.body.queryResult.parameters['temperature'];
        let weather_text;

        if (utils.checkTypeOf(weather, 'string')) {
            if (utils.compareString(weather, "")) {
                weather_text = 'Wetter'
            } else {
                weather_text = weather;
            }
        }


    }


    function weatherForecastDatePeriod(agent) {
        /* const testStartDate = agent.request_.body.queryResult.parameters['date-period'][0]['startDate'];
         const timePeriod = agent.request_.body.queryResult.outputContexts[0].parameters['date-period.original'];
         const locationCity = agent.request_.body.queryResult.outputContexts[0].parameters['geo-city.original'];*/
        const weather = agent.request_.body.queryResult.parameters['wetter.original'];
        const locationCity = agent.request_.body.queryResult.parameters['geo-city.original'];
        const timePeriod = agent.request_.body.queryResult.parameters['date-period'];
        const timePeriodOriginal = agent.request_.body.queryResult.parameters['date-period.original'];
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
        conv.ask(new Suggestions(strings.intent_suggestions));
        agent.add(conv);

    }

    function incorrectTopicLastTime(agent) {
        let conv = agent.conv();
        conv.ask(strings.last_fallback[utils.getRandomInt(strings.last_fallback.length)]);
        conv.ask(strings.general.available_topics);
        conv.ask(new Suggestions(strings.intent_suggestions));
        agent.add(conv);
    }


    let intentMap = new Map();
    intentMap.set(strings.intents.last_time_incorrect, incorrectTopicLastTime);
    intentMap.set(strings.intents.welcome, welcome);
    agent.handleRequest(intentMap);
});


function xd(xd, xd2) {
    return xd.request_.body.queryResult.parameters[xd2];
}
