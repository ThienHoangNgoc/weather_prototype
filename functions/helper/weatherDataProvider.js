//provides the needed weather data
//call this in response Builder
const utils_date = require("./utils/utils_date");

const SingleWeatherData = "";
const DatePeriodWeatherData = "";

const provideSingleDateWeatherData = (request_data) => {

};

const provideDatePeriodWeatherData = (request_data) => {
    let day_diff = utils_date.calculateDiffFrom2Dates(request_data.start_date, request_data.end_date, "days");
    if (day_diff <= 14) {


    } else {
        //TODO: return message no data for that date in request_data --> accepted date_period as boolean.

    }


};


