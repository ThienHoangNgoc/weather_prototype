const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const admin = require('firebase-admin')


process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();


exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({request, response});

    function welcome(agent) {
        agent.add(`Willkommen! Gib bitte eine Spracheingabe bezüglich des Themas Wetter ein.`);
    }

    function fallback(agent) {
        //save den input nochmal confirmen?
        agent.add(`Es tut mir leid, aber ich kann deine Spracheingabe nicht verarbeiten`);
    }

    function weatherForecastDatePeriod(agent) {
        const timePeriodOriginal = agent.request_.body.queryResult.outputContexts[0].parameters['date-period.original'];
        const timePeriod = agent.request_.body.queryResult.outputContexts[0].parameters['date-period'];


        // wenn in String integriert sein solll --> ${hier def. var}
        if (timePeriod.toString().includes('nächst')) {
            agent.add(` hahahaah LOLOLOL`)
        } else {
            agent.add("random message")
        }

        agent.add("this is the start day: " + timePeriod);



    }

    function confirmCorrectInput(agent) {
        agent.add('Alles klar, deine Eingabe wurde gespeichert')
    }

  /*  function getDay(date){
        let dateDay = date.toString().substring(8,10);

        return dateDay;
    }*/


    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('tell_me_the_weather_state - yes', confirmCorrectInput)
    intentMap.set('weather_date_period_forecast', weatherForecastDatePeriod)
    agent.handleRequest(intentMap);
});

