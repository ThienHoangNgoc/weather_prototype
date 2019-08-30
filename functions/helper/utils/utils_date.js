"use strict";
const dateFormat = require('dateformat');

/**
 * convert given date to custom date format returns string
 * example dialogFow date: 2019-08-10T12:00:00+02:00
 * @param dateString
 * @param customDateFormat
 */
const getDateFormatted = (dateString, customDateFormat) => {
    let date = new Date(dateString);
    dateFormat.masks.ownDateformat = customDateFormat;
    return dateFormat(date, dateFormat.masks.ownDateformat);
};

/**
 * add days to given date, return the new Date
 * @param date
 * @param days
 * @returns {Date}
 */
function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/**
 * calculate the diff between 2 dates and returns that value in the given interval, gives the diff between the days 01.09 - 03.09 returns 2
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
/**
 * returns date without time
 * @param date
 * @returns {Date}
 */
const getDateWithoutTime = (date) => {
    return new Date(getDateFormatted(date, "yyyy-mm-dd"))
};
/**
 * set gmt to +2
 * local time is set to gmt +0 instead of gmt +2
 * search for cause... (server timezone gmt +0?)
 * band aid solution for the time being
 *
 * @returns {Date}
 */
const getGMTNewDate = () => {
    let result = new Date();
    result.setHours(result.getHours() + 2);
    return result;
};


const addDaysToDate = (date, days) => {
    return new Date(date.setDate(date.getDate() + days));


}

/*
 * Set values to specific language, here German values
 */
dateFormat.i18n = {
    dayNames: [
        'SO', 'MO', 'DI', 'MI', 'DO', 'FR', 'SA',
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

module.exports = {getDateFormatted, calculateDiffFrom2Dates, addDays, getDateWithoutTime, getGMTNewDate};