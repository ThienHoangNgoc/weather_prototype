'use strict';

const utils = require('../utils/utils');

/**
 * return list with random Suggestions, where the last index is always the quit suggestion
 *
 * @param list
 * @param quit_string
 * @returns {Error|*[]}
 */
const getRandomSuggestionsList = (list, quit_string) => {
    if (list.length > 1) {
        let suggestion1 = 0;
        let suggestion2 = 0;
        while (suggestion1 === suggestion2) {
            suggestion1 = utils.getRandomInt(list.length);
            suggestion2 = utils.getRandomInt(list.length);
        }
        return [list[suggestion1], list[suggestion2], quit_string];
    } else {
        return new Error("list.length is smaller than 2 ");
    }


};

module.exports = {getRandomSuggestionsList}