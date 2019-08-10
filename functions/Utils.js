"use strict";
const dateFormat = require('dateformat');

//get random Number within the Range of max
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};


//compare 2 Strings
const compareString = (firstString, secondString) => {
    if (checkTypeOf(firstString, 'string') && checkTypeOf(secondString, 'string')) {
        return firstString.toString().trim() === secondString;
    }
    return false;
};

const checkTypeOf = (object, typeAsString) => {
    return (typeof object === typeAsString);
};

const isStringArray = (stringList) => {
    for (let index = 0; index < stringList.length; index++) {
        if (!checkTypeOf(stringList[index], 'string')) {
            return false;
        }
    }
    return true;
};

const compareStringWithArray = (string, stringList) => {
    for (let index = 0; index < stringList.length; ++index) {
        if (!compareString(stringList[index], string)) {
            return false;
        }
    }
    return true;
}
//2019-08-10T12:00:00+02:00
const getDateFormatted = (date_string) => {
    let date = new Date(date_string);
    dateFormat.masks.ownDateformat = 'dd.mmmm yyyy';
    return dateFormat(date, dateFormat.masks.ownDateformat);
};

const firstLetterUpperCase = (string) =>{
    if(checkTypeOf(string,'string')){
        return string.toString().charAt(0).toUpperCase() + string.toString().slice(1);

    }
}

const containsString = (firstString, secondString) => {
    if (checkTypeOf(firstString, 'string') && checkTypeOf(secondString, 'string')) {
        return firstString.includes(secondString);
    }
    return false;

};

module.exports = {
    getRandomInt,
    compareString,
    checkTypeOf,
    containsString,
    isStringArray,
    compareStringWithArray,
    getDateFormatted,
    firstLetterUpperCase
};