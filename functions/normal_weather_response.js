"use strict";

const {Image, Suggestions, BasicCard, Button} = require('actions-on-google');
const {Card, Suggestion} = require('dialogflow-fulfillment');

const strings = require('./jsons/strings');
const responses = require("./jsons/conv_strings");
const urls = require('./jsons/urls');

const weather_text_builder = require('./response_builder/weather_text_builder');
const utils = require('./utils/utils');

const Weather = require('./model/Weather');


const weather = (agent) => {
    const weather = agent.request_.body.queryResult.parameters['weather'];
    const date_original = agent.request_.body.queryResult.outputContexts[0].parameters['date.original'];
    const date = agent.request_.body.queryResult.parameters['date'];
    const location = agent.request_.body.queryResult.parameters['geo-city'];
    let weather_text;
    let date_original_text;
    let location_text;
    let responseList;
    let date_text = utils.getDateFormatted(date, '(ddd) dd.mm');

    const weatherDummy = new Weather;

    //check if request parameters are strings
    if (utils.isStringArray([weather, date_original, location])) {
        weather_text = weather_text_builder.getTypeOfWeather(weather);
        date_original_text = weather_text_builder.getDateText(date_original);

        //If the User does not input a location take default city
        if (utils.isEmpty(location)) {
            location_text = strings.default.city_names.Berlin;
        } else {
            location_text = location;
        }

        switch (weather_text) {
            case strings.weather_type.response.weather:
                //response when weather_text equals "weather"
                responseList = weather_text_builder.getWeatherResponse(weather_text, date_original_text, location_text, weatherDummy);
                giveShortResponse(responseList, date_original_text, agent, weatherDummy);
                break;
            case strings.weather_type.response.forecast || strings.weather_type.response.outlook:
                //response when weather_text equals "weather outlook" and "weather forecast"
                responseList = weather_text_builder.getWeatherForecastAndOutlookResponse(weather_text, date_original_text, location_text, weatherDummy);
                showInfoCard(responseList, date_text, agent, weatherDummy);
                break;
            case strings.weather_type.response.report:
                //response when weather_text equals "weather report"
                responseList = weather_text_builder.getWeatherReportResponse(weather_text, date_original_text, location_text, weatherDummy);
                showInfoCard(responseList, date_text, agent, weatherDummy);
                break;
            default:
                responseList = responses.general.error_message;
                break;
        }

    } else {
        agent.add(responses.general.error_message);
    }

};

const giveShortResponse = (responseList, date_original_text, agent, weatherDummy) => {
    if (agent.requestSource === agent.ACTIONS_ON_GOOGLE) {
        let conv = agent.conv();
        conv.ask(responseList[utils.getRandomInt(responseList.length)]);
        conv.ask(`Möchtest du noch etwas anderes über das Wetter von ${date_original_text} erfahren?`);
        agent.add(conv);
    } else {
        agent.add(responseList[utils.getRandomInt(responseList.length)]);
        agent.add();
    }
    agent.context.set({
        name: strings.contexts.short_response, lifespan: 10,
        parameters: {
            isSunny: weatherDummy.isSunny,
            dayMax: weatherDummy.dayMAX,
            dayMIN: weatherDummy.dayMIN,
            nightMAX: weatherDummy.nightMAX,
            nightMIN: weatherDummy.nightMIN,
            sunHours: weatherDummy.sunHours,
            rain: weatherDummy.rain,
            isStormy: weatherDummy.tempest
        }
    });

};


const showInfoCard = (responseList, date_text, agent, weatherDummy) => {
    //check if device has Google Assistant
    if (agent.requestSource === agent.ACTIONS_ON_GOOGLE) {
        let conv = agent.conv();
        conv.ask(responseList[utils.getRandomInt(responseList.length)]);
        conv.ask(responses.weather_responses.more_info);
        conv.ask(new BasicCard({
            text: weather_text_builder.weather_card_text_builder(weatherDummy),
            //later: separate emoji and weatherStateText in to sections
            subtitle: strings.emoji.weather_state[utils.getRandomInt(strings.emoji.weather_state.length)],
            title: date_text,
            buttons: new Button({
                title: strings.button_text.more_info,
                url: urls.website.filler
            }),
            image: new Image({
                url: urls.image.filler,
                alt: strings.hover_text.image
            })

        }));
        conv.ask(new Suggestions(strings.topic_suggestions));
        agent.add(conv);
    } else {
        //get random message from list
        agent.add(responseList[utils.getRandomInt(responseList.length)]);
        agent.add(responses.weather_responses.more_info);
        agent.add(new Card({
            title: date_text,
            imageUrl: urls.image.filler,
            text: "",
            buttonText: strings.button_text.more_info,
            buttonUrl: urls.website.filler
        }));
        agent.add(new Suggestion(strings.topic_suggestions[0]));
        agent.add(new Suggestion(strings.topic_suggestions[1]));
        agent.add(new Suggestion(strings.topic_suggestions[2]));

    }
};

module.exports = weather;

