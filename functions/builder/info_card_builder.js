"use strict";
const {Image, BasicCard, Button} = require('actions-on-google');

const weather_helper = require('./weather_helper');
const strings = require('../jsons/card_strings');
const urls = require('../jsons/urls');
const utils_date = require('../utils/utils_date');

const image_url_placeholder = urls.image.placeholder;
const image_url_day = urls.image.weather_state.day;
const image_url_night = urls.image.weather_state.night;
const info_card_title = strings.weather_info_templates.title;
const info_card_subtitle = strings.weather_info_templates.subtitle;
const max_temp_label = strings.weather_card_label.max_value;
const min_temp_label = strings.weather_card_label.min_value;
const rain_label = strings.weather_card_label.rain;
const sun_hours_label = strings.weather_card_label.sun_hours;


const button_title = strings.button_text.button_title;
const button_url = urls.website.placeholder;
const image_hover_text = strings.button_text.card_image_hover_text;


const buildDetailedWeatherCard = (request_data, weather_data) => {
    let image_url;
    if (weather_data.isDay) {
        image_url = image_url_day;
    } else {
        image_url = image_url_night;
    }
    return new BasicCard({
        text: buildInfoCardText(weather_data),
        subtitle: request_data.insertRequestDataForSubtitle(info_card_subtitle),
        title: weather_data.insertWeatherData(info_card_title),
        buttons: new Button({
            title: button_title,
            url: button_url
        }),
        image: new Image({
            url: image_url,
            alt: image_hover_text
        }),
        display: 'CROPPED'
    })
};

const buildWeatherCardForDatePeriod = (request_data, weather_data) => {
    return new BasicCard({
        text: "",
        subtitle: "",
        title: "",
        buttons: new Button({
            title: "",
            url: ""
        }),
        image: new Image({
            url: image_url_placeholder,
            alt: image_hover_text
        }),
        display: 'CROPPED'
    })
};


const buildInfoCardText = (weather_data) => {
    const line = "  \n";
    const max = weather_data.dayMAX + "°";
    const min = weather_data.nightMIN + "°";
    const rain = weather_data.rain + " %";
    const sun = weather_data.sunHours;

    return stringBold(max_temp_label) + max + line
        + stringBold(min_temp_label) + min + line
        + stringBold(rain_label) + rain + line
        + stringBold(sun_hours_label) + sun;

};

/**
 * customization for text in a basic card
 * @param string
 * @returns {string}
 */
const stringBold = (string) => {
    return "__" + string + "__ ";
};

// ToDo: needed?
const buildMoreInfoCard = (agent) => {
};


module.exports = {buildDetailedWeatherCard}

