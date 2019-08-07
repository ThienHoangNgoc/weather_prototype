const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const strings = require('./string');
const admin = require('firebase-admin');
const stringCreator = require('./test');
const {Carousel, BrowseCarousel, BrowseCarouselItem, Image, Suggestions, Confirmation} = require('actions-on-google');
const SELECTION_KEY_1 = "selection_key_1";


process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();




exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({request, response});
    agent.requestSource = agent.ACTIONS_ON_GOOGLE;

    function welcome(agent) {
        agent.add(strings.standard.welcome);
    }


    function fallback(agent) {
        agent.add(`Es tut mir leid, aber ich kann deine Spracheingabe nicht verarbeiten`);
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
            'lol'
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
        agent.add("test xd");
        agent.add(conv);

    }






    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('weather_date_period_forecast', weatherForecastDatePeriod)
    agent.handleRequest(intentMap);
});

