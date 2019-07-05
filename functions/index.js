const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const images = require('./images');
const imageUrlNaruto = images.narutoImageUrl;
const buttonUrlNaruto = 'https://naruto.fandom.com/de/wiki/Narutopedia';
const imageUrlBleach = images.image2
const buttonUrlBleach = 'https://bleach.fandom.com/de/wiki/BleachWiki';
const imageUrlOP = images.image3
const buttonUrlOP = 'http://opwiki.org/';
const imageUrlAoT = 'https://vignette.wikia.nocookie.net/shingekinokyojin/images/a/a7/Survey_Corps_Logo.png/revision/latest?cb=20140307090257';
const buttonUrlAoT = 'https://attackontitan.fandom.com/de/wiki/Attack_on_Titan_Wiki';



process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });

    function welcome(agent) {
        agent.add(`Welcome to ShonenJump info provider`);
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
    }

    function yourFunctionHandler(agent) {
        const mangaName = agent.parameters.Manga;
        switch(mangaName.toLowerCase()){
            case 'naruto':
                agent.add(`Here are some infomations about ${mangaName}.`);
                agent.add(new Card({
                        title: `${mangaName}`,
                        imageUrl: imageUrlNaruto,
                        text: `Naruto is manga about ninja.`,
                        buttonText: 'More info',
                        buttonUrl: buttonUrlNaruto
                    })
                );
                break;
            case 'bleach':
                agent.add(`Here are some infomations about ${mangaName}.`);
                agent.add(new Card({
                        title: `${mangaName}`,
                        imageUrl: imageUrlBleach,
                        text: `${mangaName} is manga about shinigami.`,
                        buttonText: 'More info',
                        buttonUrl: buttonUrlBleach
                    })
                );
                break;
            case 'one piece':
                agent.add(`Here are some infomations about ${mangaName}.`);
                agent.add(new Card({
                        title: `${mangaName}`,
                        imageUrl: imageUrlOP,
                        text: `${mangaName} is manga about pirates.`,
                        buttonText: 'More info',
                        buttonUrl: buttonUrlOP
                    })
                );
                break;
            case 'shingeki no kyojin':
                agent.add(`Here are some infomations about ${mangaName}.`);
                agent.add(new Card({
                        title: `${mangaName}`,
                        imageUrl: imageUrlAoT,
                        text: `${mangaName} is manga about Titans.`,
                        buttonText: 'More info',
                        buttonUrl: buttonUrlAoT
                    })
                );
                break;
        }
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('Manga_Info', yourFunctionHandler);
    agent.handleRequest(intentMap);
});