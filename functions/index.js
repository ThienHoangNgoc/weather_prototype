const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');

const strings = require('./strings');
const responses = require("./response_strings");
const utils = require('./Utils');
const weather_response_builder = require('./weather_response_builder');
const image_url = require('./image_url');

const {Carousel, BrowseCarousel, BrowseCarouselItem, Image, Suggestions, Confirmation, SimpleResponse} = require('actions-on-google');
const {Card, Suggestion} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements


exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({request, response});
    agent.requestSource = agent.ACTIONS_ON_GOOGLE;


    function welcome(agent) {
        agent.add(responses.welcome.welcome);
    }

    function weather(agent) {
        const weather = agent.request_.body.queryResult.parameters['weather'];
        // original parameter can only be accessed through the output Context - set Output Context in dialogflow
        const dateOriginal = agent.request_.body.queryResult.outputContexts[0].parameters['date.original'];
        const date = agent.request_.body.queryResult.parameters['date'];
        const location = agent.request_.body.queryResult.parameters['geo-city'];
        let weather_text;
        let date_original_text;
        let responseList;
        let date_text = utils.getDateFormatted(date);


        if (utils.isStringArray([weather,dateOriginal, location])) {
            weather_text = weather_response_builder.getTypeOfWeather(weather);
            date_original_text = weather_response_builder.getDateText(dateOriginal);

            //response when weather_text equals "weather"
            if (utils.compareString(weather_text, strings.weather_type.response.weather)) {
                responseList = weather_response_builder.getWeatherResponse(weather_text, date_original_text, location);
                //get random message from list
                agent.add(responseList[utils.getRandomInt(responseList.length)]);
            }

            //response when weather_text equals "weather report" and "weather forecast"
            if (utils.compareString(weather_text, strings.weather_type.response.forecast) || utils.compareString(weather_text, strings.weather_type.response.report)) {
                responseList = weather_response_builder.getWeatherForecastAndReportResponse(weather_text, date_original_text, location);
                //get random message from list
                agent.add(responseList[utils.getRandomInt(responseList.length)]);
            }

            agent.add(responses.weather_responses.more_info);
            agent.add(new Card({
                title: `Wetterbericht (${date_text})`,
                imageUrl: image_url.filler_image,
                text: '',
                buttonText: 'mehr Info',
                buttonUrl: image_url.filler_url
            }))


        } else {
            agent.add(responses.general.error_message);
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
