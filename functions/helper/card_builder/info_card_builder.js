"use strict";
const {Image, BasicCard, Button} = require('actions-on-google');

const strings = require('./card_strings');
const urls = require('../../jsons/urls');
const utils_date = require('../../utils/utils_date');

//Buttons and images
const image_url_placeholder = urls.image.placeholder;
const image_url_day = urls.image.weather_state.day;
const image_url_night = urls.image.weather_state.night;
const button_title = strings.button_text.button_title;
const button_url = urls.website.placeholder;
const image_hover_text = strings.button_text.card_image_hover_text;

//date info card
const date_info_card_title_today = strings.weather_card_templates.date.title_today;
const date_info_card_title_not_today = strings.weather_card_templates.date.title_not_today;
const date_info_card_subtitle = strings.weather_card_templates.date.subtitle;
const date_max_temp_label = strings.weather_card_label.date.max_value;
const date_min_temp_label = strings.weather_card_label.date.min_value;
const date_rain_label = strings.weather_card_label.date.rain;
const date_sun_hours_label = strings.weather_card_label.date.sun_hours;

//date_period info card
const date_period_card_subtitle = strings.weather_card_templates.date_period.subtitle;
const date_period_day_label = strings.weather_card_label.date_period.day;
const date_period_night_label = strings.weather_card_label.date_period.night;
const date_period_rain_label = strings.weather_card_label.date_period.rain;
const date_period_sun_hours_label = strings.weather_card_label.date_period.sun_hours;

const date_period_custom_date_format = "(ddd) dd.mm";


const buildDetailedWeatherCard = (request_data, weather_data) => {
    let image_url;
    let is_today_title;
    if (weather_data.isDay) {
        image_url = image_url_day;
    } else {
        image_url = image_url_night;
    }
    if (request_data.isToday) {
        is_today_title = weather_data.insertWeatherData(date_info_card_title_today);
    } else {
        is_today_title = weather_data.insertWeatherData(date_info_card_title_not_today);
    }
    return new BasicCard({
        text: buildDateCardText(weather_data),
        subtitle: request_data.insertRequestDataForSubtitle(date_info_card_subtitle),
        title: is_today_title,
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

const buildWeatherCardForDatePeriod = (request_data) => {
    return new BasicCard({
        text: buildDatePeriodCardText(),
        subtitle: date_period_card_subtitle,
        title: request_data.location + " • " +
            utils_date.getDateFormatted(request_data.start_date, date_period_custom_date_format) + " - " +
            utils_date.getDateFormatted(request_data.end_date, date_period_custom_date_format),
        buttons: new Button({
            title: button_title,
            url: button_url
        }),
        image: new Image({
            url: image_url_placeholder,
            alt: image_hover_text
        }),
        display: 'CROPPED'
    })
};
const buildDatePeriodCardText = () => {
    const line = "  \n";
    const dummy_day = "29°";
    const dummy_night = "21°";
    const dummy_rain = "12%";
    const dummy_sun = "8";

    return stringBold(date_period_day_label) + dummy_day + line
        + stringBold(date_period_night_label) + dummy_night + line
        + stringBold(date_period_rain_label) + dummy_rain + line
        + stringBold(date_period_sun_hours_label) + dummy_sun;
};

const buildDateCardText = (weather_data) => {
    const line = "  \n";
    const max = weather_data.dayMAX + "°";
    const min = weather_data.nightMIN + "°";
    const rain = weather_data.rain + " %";
    const sun = weather_data.sunHours;

    return stringBold(date_max_temp_label) + max + line
        + stringBold(date_min_temp_label) + min + line
        + stringBold(date_rain_label) + rain + line
        + stringBold(date_sun_hours_label) + sun;

};

/**
 * customization for text in a basic card
 * @param string
 * @returns {string}
 */
const stringBold = (string) => {
    return "__" + string + "__ ";
};


module.exports = {buildDetailedWeatherCard, buildWeatherCardForDatePeriod}

