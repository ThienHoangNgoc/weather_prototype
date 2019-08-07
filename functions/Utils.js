"use strict";
const getRandomInt = (max)=>{
    return Math.floor(Math.random() * Math.floor(max));
};

const fillerFunction = (filler)=>{
    return filler;
}

module.exports = {getRandomInt, fillerFunction};