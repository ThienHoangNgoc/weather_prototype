"use strict";
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

const containsString = (firstString, secondString) => {
    if (checkTypeOf(firstString, 'string') && checkTypeOf(secondString, 'string')) {
        return firstString.includes(secondString);
    }
    return false;

};

module.exports = {getRandomInt, compareString, checkTypeOf, containsString};