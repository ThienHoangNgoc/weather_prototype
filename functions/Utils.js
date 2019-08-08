"use strict";
//get random Number within the Range of max
const getRandomInt = (max)=>{
    return Math.floor(Math.random() * Math.floor(max));
};


//compare 2 Strings
const compareString = (firstString, secondString)=>{
    return firstString.toString().trim() === secondString;
};

const checkTypeOf = (object, typeAsString) => {
    return (typeof object === typeAsString);
}

module.exports = {getRandomInt, compareString, checkTypeOf};