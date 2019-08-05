const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const admin = require('firebase-admin');
const stringCreator = require('./test');
const {Carousel, BrowseCarousel, BrowseCarouselItem, Image} = require('actions-on-google');
const SELECTION_KEY_1 = "selection_key_1"


process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();


exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({request, response});
    agent.requestSource = agent.ACTIONS_ON_GOOGLE;

    function welcome(agent) {
        agent.add(`Willkommen! Gib bitte eine Spracheingabe bezüglich des Themas Wetter ein.`);
    }


    function fallback(agent) {
        //save den input nochmal confirmen?
        agent.add(`Es tut mir leid, aber ich kann deine Spracheingabe nicht verarbeiten`);
    }

    function weatherForecastDatePeriod(agent) {
        /* const testStartDate = agent.request_.body.queryResult.parameters['date-period'][0]['startDate'];
         const timePeriod = agent.request_.body.queryResult.outputContexts[0].parameters['date-period.original'];
         const locationCity = agent.request_.body.queryResult.outputContexts[0].parameters['geo-city.original'];*/
        const weather = agent.request_.body.queryResult.parameters['wetter.original'];
        const locationCity = agent.request_.body.queryResult.parameters['geo-city.original'];
        const timePeriod = agent.request_.body.queryResult.parameters['date-period'];
        const timePeriodOriginal = agent.request_.body.queryResult.parameters['date-period.original'];

        let conv = agent.conv();
        conv.ask('Suche ein Item aus');
        /*conv.ask(new Carousel({
            items: {
                [SELECTION_KEY_1]: {
                    title: 'item 1',
                    synonyms: [
                        'xd',
                    ],
                    description: 'description 1',
                    image: new Image({
                        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/One_Piece_Logo.svg/1200px-One_Piece_Logo.svg.png',
                        alt: '',
                    })
                },
                'key_2': {
                    title: 'item 2',
                    synonyms: [
                        'xd 2',
                    ],
                    description: 'description 1',
                    image: new Image({
                        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/One_Piece_Logo.svg/1200px-One_Piece_Logo.svg.png',
                        alt: '',
                    })
                },
                '3': {
                    title: 'item 3',
                    synonyms: [
                        'xd 3',
                    ],
                    description: 'description 1',
                    image: new Image({
                        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/One_Piece_Logo.svg/1200px-One_Piece_Logo.svg.png',
                        alt: '',
                    })
                },
                'key_4': {
                    title: 'item 4',
                    synonyms: [
                        'xd 244444444',
                    ],
                    description: 'description 1',
                    image: new Image({
                        url: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/One_Piece_Logo.svg/1200px-One_Piece_Logo.svg.png',
                        alt: '',
                    })
                }
            }

        }));*/
        conv.ask(new BrowseCarousel({
            items: [
                new BrowseCarouselItem({
                    title: 'item #1',
                    url: 'https://www.reddit.com/r/OnePiece/',
                    description: 'item 1 description',
                    image: {
                        url: "https://imgur.com/a/6IebsZ9",
                        accessibilityText: "test"
                    },
                    footer: 'item 1 footer'
                }),
                new BrowseCarouselItem({
                    title: 'item #2',
                    url: 'https://www.reddit.com/r/OnePiece/',
                    description: 'item 2 description',
                    image: new Image({
                        url: 'https://imgur.com/a/6IebsZ9',
                        alt: ''
                    }),
                    footer: 'item 2 footer'
                })

            ]


        }));

        agent.add("test xd")
        agent.add(conv);

        if (typeof timePeriod === 'string') {

        } else {

        }

        let weather_text;

        /*if (weather_text.toLowerCase().includes("wetter")) {
            agent.add(`Das Wetter in den ${timePeriodOriginal} bleibt in ${locationCity} angenehm warm bei zwischen 23 und 27 Grad Tagsüber, in der Nacht bei 
            zwischen 17 und 20 Grad.`)
        } else if (weather_text.toLowerCase().includes("vorhersage")) {
            agent.add(`Die ${weather} in den ${timePeriodOriginal} für ${locationCity} sieht wie folgt aus:`)
        }else if(weather_text.toLowerCase().includes("prognose")){
            agent.add(`Die ${weather} in den ${timePeriodOriginal} für ${locationCity} sieht wie folgt aus:`)
        }*/


        /*if (weather.toString().toLowerCase().includes('wetter')) {
            agent.add(`In den ${timePeriod} wird das ${weather} in ${locationCity} angenehm warm. Die Tageshöchstwerte liegen zwischen 27 und 30 Grad, in der Nacht zwischen 15 und 18 Grad.`);
        } else if (weather.toString().toLowerCase().includes('vorhersage')) {
            agent.add(`Die ${weather} in den ${timePeriod} in ${locationCity} ist wie folgt. Die Tageshöchstwerte liegen zwischen 27 und 30 Grad, in der Nacht zwischen 15 und 18 Grad.`);
        }*/


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

