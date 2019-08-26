"use strict";

/*
=========================================================================================================
OTHER UTILS
=========================================================================================================
*/

/**
 *  get a random number excluding max
 * @param max
 * @returns {number}
 */
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

/**
 *  get a random number between min and max (including both)
 * @param min
 * @param max
 * @returns {number}
 */
const getRandomIntInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
/**
 * check if object is a specific type
 * @param object
 * @param typeAsString
 * @returns {boolean}
 */
const checkTypeOf = (object, typeAsString) => {
    return (typeof object === typeAsString);
};

/**
 * get a random entry from an array
 * @param array
 * @returns array entry
 */
const getRandomArrayEntry = (array) => {
    return array[getRandomInt(array.length)];
};

const getRandomBoolean = () => {
    return getRandomInt(2) === 1;
};


/*
=========================================================================================================
STRING UTILS
=========================================================================================================
*/

/**
 * check if given string is empty
 * @param string
 * @returns {*|boolean}
 */
const isEmpty = (string) => {
    return equalsString(string, "");
};

/**
 * check if given object is a String
 * @param object
 * @returns {boolean}
 */
const isString = (object) => {
    return checkTypeOf(object, 'string');
};

/**
 * check if given Strings are equal
 * @param firstString
 * @param secondString
 * @returns {boolean}
 */
const equalsString = (firstString, secondString) => {
    if (isString(firstString) && isString(secondString)) {
        return firstString.toString().trim() === secondString;
    }
    return false;
};


/**
 * check if given array contains only Strings
 * @param stringList
 * @returns {boolean}
 */
const isStringArray = (stringList) => {
    for (let index = 0; index < stringList.length; index++) {
        if (!isString(stringList[index])) {
            return false;
        }
    }
    return true;
};

/**
 * check if given String is in given array
 * @param string
 * @param stringList
 * @returns {boolean}
 */
const stringIsInArray = (string, stringList) => {
    for (let index = 0; index < stringList.length; ++index) {
        if (equalsString(stringList[index], string)) {
            return true;
        }
    }
    return false;
};

/**
 * change the first character of given string to upper case
 * @param string
 * @returns {string}
 */
const firstLetterUpperCase = (string) => {
    if (isString(string)) {
        return string.toString().charAt(0).toUpperCase() + string.toString().slice(1);

    }
};
/**
 * check if secondString is in firstString
 * @param firstString
 * @param secondString
 * @returns {boolean|*}
 */
const containsString = (firstString, secondString) => {
    if (isString(firstString) && isString(secondString)) {
        return firstString.includes(secondString);
    }
    return false;

};

/**
 * check if key_word is in string and exchange it with the given standardized_string. Also set grammatical article
 * @param string
 * @param key_word
 * @param standard_string
 * @param gram_article
 * @returns {string}
 */
const standardizeString = (string, key_word, standardized_string, gram_article) => {
    string = string.toString();
    let words = string.split(" ");
    for (let index = 0; words.length > index; index++) {
        if (containsString(words[index], key_word)) {
            words.splice(index, 1, standardized_string);
        }
    }
    let new_string = "";
    for (let index = 0; words.length > index; index++) {
        new_string += words[index] + " ";
    }
    return gram_article + new_string;

};


module.exports = {
    getRandomInt,
    getRandomIntInRange,
    getRandomArrayEntry,
    getRandomBoolean,
    equalsString,
    isEmpty,
    isString,
    checkTypeOf,
    containsString,
    isStringArray,
    stringIsInArray,
    firstLetterUpperCase,
    standardizeString
};