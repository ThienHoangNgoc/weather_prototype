"use strict";
const dateFormat = require('dateformat');


/**
 * convert given date to custom date format
 * example dialogFow date: 2019-08-10T12:00:00+02:00
 * @param dateString
 * @param customDateFormat
 */
const getDateFormatted = (dateString, customDateFormat) => {
    let date = new Date(dateString);
    dateFormat.masks.ownDateformat = customDateFormat;
    return dateFormat(date, dateFormat.masks.ownDateformat);
};

const getResponseFromDate = (date_string) => {
    const current_date = new Date();
    const request_date = new Date(date_string);
    let day_diff = calculateDiffFrom2Dates(current_date, request_date, "days");
    let week_diff = calculateDiffFrom2Dates(current_date, request_date, "weeks");
    let month_diff = calculateDiffFrom2Dates(current_date, request_date, "months");

};

/**
 * calculae the diff between 2 dates and returns that value in the given interval
 * @param current_date
 * @param request_date
 * @param interval
 * @returns {number}
 */
const calculateDiffFrom2Dates = (current_date, request_date, interval) => {
    let second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;
    let diff = request_date - current_date;
    if (isNaN(diff)) return NaN;
    switch (interval) {
        case "years" :
            return request_date.getFullYear() - current_date.getFullYear();
        case "months":
            return ((request_date.getFullYear * 12 + request_date.getMonth()) - (current_date.getFullYear * 12 + current_date.getMonth()));
        case "weeks":
            return Math.floor(diff / week);
        case "days":
            return Math.floor(diff / day);

    }

};


/*
 * Set values to specific language, here German values
 */
dateFormat.i18n = {
    dayNames: [
        'SO', 'MO', 'DI', 'MI', 'DO', 'FRI', 'SA',
        'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'
    ],
    monthNames: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ],
    timeNames: [
        'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
    ]
};

module.exports = {getDateFormatted, calculateDiffFrom2Dates};