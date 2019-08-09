const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');

const strings = require('./strings');
const responses = require("./response_strings");
const utils = require('./Utils');

const {Carousel, BrowseCarousel, BrowseCarouselItem, Image, Suggestions, Confirmation, SimpleResponse} = require('actions-on-google');
const {Card, Suggestion} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements


exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({request, response});
    agent.requestSource = agent.ACTIONS_ON_GOOGLE;


    function welcome(agent) {
        agent.add(responses.welcome);
    }

    function weather(agent) {
        const weather = agent.request_.body.queryResult.parameters['weather'];
        const date = agent.request_.body.queryResult.parameters['date.original'];
        const location = agent.request_.body.queryResult.parameters['geo-city'];
        let weather_text;
        let date_text;


        if (utils.compareString(weather.toLowerCase(), strings.weather_type.short.weather) || utils.compareString(weather.toLowerCase(), "")) {
            weather_text = strings.weather_type.response.weather;
        } else if (utils.containsString(weather.toLowerCase(), strings.weather_type.short.forecast)) {
            weather_text = strings.weather_type.response.forecast;
        } else if (utils.containsString(weather.toLowerCase(), strings.weather_type.short.report)) {
            weather_text = strings.weather_type.response.report;
        }


        if (utils.containsString(date, "heut")) {
            date_text = "heute";
        }

        agent.add(`Das ${weather_text} für ${date} in ${location} sieht wie folgt aus:`);
        agent.add(`In ${location} werden es ${date_text} tagsüber bis zu 30 Grad und. `);
        agent.add(`${date_text} ist es in ${location} stark bewöklt. Ab und zu scheint auch die Sonne.`);
        agent.add(`Die ${weather_text} für ${location} sieht ${date} sieht folgendermaßen aus:`);




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
        conv.ask(new Suggestions(strings.topic_suggestions));
        agent.add(conv);

    }

    function incorrectTopicLastTime(agent) {
        let conv = agent.conv();
        conv.ask(responses.last_fallback.responses[utils.getRandomInt(responses.last_fallback.responses.length)]);
        conv.ask(responses.last_fallback.hint_for_available_topics);
        conv.ask(new Suggestions(strings.topic_suggestions));
        agent.add(conv);
    }


    let intentMap = new Map();
    intentMap.set(strings.intents.last_time_incorrect, incorrectTopicLastTime);
    intentMap.set(strings.intents.welcome, welcome);
    intentMap.set(strings.intents.weather, weather);
    agent.handleRequest(intentMap);
});
