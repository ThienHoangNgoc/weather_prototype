const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');

const strings = require('./strings');
const responses = require("./response_strings");
const utils = require('./Utils');
const weather_response_builder = require('./weather_response_builder');
const urls = require('./urls');

const {Carousel, BrowseCarousel, BrowseCarouselItem, Image, Suggestions, Confirmation, SimpleResponse} = require('actions-on-google');
const {Card, Suggestion} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements


exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({request, response});

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
        let location_text;
        let responseList;
        let date_text = utils.getDateFormatted(date, '(ddd) dd.mm');

        //check if request parameters are strings
        if (utils.isStringArray([weather, dateOriginal, location])) {
            weather_text = weather_response_builder.getTypeOfWeather(weather);
            date_original_text = weather_response_builder.getDateText(dateOriginal);

            //If the User does not input a location take default city
            if (utils.isEmpty(location)) {
                location_text = strings.default.city_names.Berlin;
            } else {
                location_text = location;
            }

            switch (weather_text) {
                case strings.weather_type.response.weather:
                    //response when weather_text equals "weather"
                    responseList = weather_response_builder.getWeatherResponse(weather_text, date_original_text, location_text);
                    break;
                case strings.weather_type.response.forecast || strings.weather_type.response.outlook:
                    //response when weather_text equals "weather outlook" and "weather forecast"
                    responseList = weather_response_builder.getWeatherForecastAndOutlookResponse(weather_text, date_original_text, location_text);
                    break;
                case strings.weather_type.response.report:
                    //response when weather_text equals "weather report"
                    responseList = weather_response_builder.getWeatherReportResponse(weather_text, date_original_text, location_text);
                    break;
                default:
                    responseList = responses.general.error_message;
                    break;
            }

            //check if device has Google Assistant
            if (agent.requestSource === agent.ACTIONS_ON_GOOGLE) {
                let conv = agent.conv();
                conv.ask(responseList[utils.getRandomInt(responseList.length)]);
                conv.ask(responses.weather_responses.more_info);
                conv.ask(new BrowseCarousel({
                    items: [
                        new BrowseCarouselItem({
                            title: date_text,
                            url: urls.website.filler,
                            description: strings.default.value,
                            image: new Image({
                                url: urls.image.filler,
                                alt: strings.default.value
                            }),
                            footer: strings.default.value
                        }),
                        new BrowseCarouselItem({
                            title: date_text,
                            url: urls.website.filler,
                            description: strings.default.value,
                            image: new Image({
                                url: urls.image.filler,
                                alt: strings.default.value
                            }),
                            footer: strings.default.value
                        })
                    ],
                }));
                conv.ask(new Suggestions(strings.topic_suggestions));
                conv.ask(new SimpleResponse({
                    speech: "hää?",
                    text: "123"
                }));
                agent.add(conv);
            } else {
                //get random message from list
                agent.add(responseList[utils.getRandomInt(responseList.length)]);
                agent.add(responses.weather_responses.more_info);
                agent.add(new Card({
                    title: date_text,
                    imageUrl: urls.image.filler,
                    text: strings.default.value,
                    buttonText: 'mehr Info',
                    buttonUrl: urls.website.filler
                }))
            }

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
})
;
