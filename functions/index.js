const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

const imageUrlNaruto = 'https://upload.wikimedia.org/wikipedia/de/thumb/9/90/Naruto_Logo_Deutsch.svg/1200px-Naruto_Logo_Deutsch.svg.png';
const buttonUrlNaruto = 'https://naruto.fandom.com/de/wiki/Narutopedia';
const imageUrlBleach = 'https://upload.wikimedia.org/wikipedia/de/thumb/e/e9/Bleach_Logo.svg/2000px-Bleach_Logo.svg.png';
const buttonUrlBleach = 'https://bleach.fandom.com/de/wiki/BleachWiki';
const imageUrlOP = 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/One_Piece_Logo.svg/1200px-One_Piece_Logo.svg.png';
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