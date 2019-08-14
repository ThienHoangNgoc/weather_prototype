"use strict";
const dateFormat = require('dateformat');

//get random Number within the Range of max (excluded max)
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

//included min, included min
const getRandomIntInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayEntry = (array) => {
    return getRandomInt(array.length);
}

const isEmpty = (string) => {
    return equalsString(string, "");
}

//compare 2 Strings
const equalsString = (firstString, secondString) => {
    if (isString(firstString) && isString(secondString)) {
        return firstString.toString().trim() === secondString;
    }
    return false;
};

const checkTypeOf = (object, typeAsString) => {
    return (typeof object === typeAsString);
};

const isString = (object) => {
    return checkTypeOf(object, 'string');
};

const isStringArray = (stringList) => {
    for (let index = 0; index < stringList.length; index++) {
        if (!isString(stringList[index])) {
            return false;
        }
    }
    return true;
};

const stringIsInArray = (string, stringList) => {
    for (let index = 0; index < stringList.length; ++index) {
        if (equalsString(stringList[index], string)) {
            return true;
        }
    }
    return false;
}
//dialog example input: 2019-08-10T12:00:00+02:00
const getDateFormatted = (date_string, dateFormatxd) => {
    let date = new Date(date_string);
    dateFormat.masks.ownDateformat = dateFormatxd;
    return dateFormat(date, dateFormat.masks.ownDateformat);
};

const firstLetterUpperCase = (string) => {
    if (isString(string)) {
        return string.toString().charAt(0).toUpperCase() + string.toString().slice(1);

    }
}

const containsString = (firstString, secondString) => {
    if (isString(firstString) && isString(secondString)) {
        return firstString.includes(secondString);
    }
    return false;

};

//Translate dayNames into German
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

module.exports = {
    getRandomInt,
    getRandomIntInRange,
    getRandomArrayEntry,
    equalsString,
    isEmpty,
    isString,
    checkTypeOf,
    containsString,
    isStringArray,
    stringIsInArray,
    getDateFormatted,
    firstLetterUpperCase
};