'use strict';

//modules
const fs = require('fs');   //to read JSON files
const DialogflowController = require('./dialogflow/DialogflowController.js'); //our simple interface to Dialogflow
const TwitchBot = require('./twitch/TwitchBot.js'); //represents the twitch bot

//Load properties
const propertyObject = JSON.parse(fs.readFileSync('properties.json'));

//Dialogflow controller. Provides an interface to the Dialogflow agent. Used in TwitchBot.js.
const dfController = new DialogflowController(propertyObject.dialogflowConfig); 

//Twitch Bot instance. Provides an interface to interacting with the Twitch chat. Reads chat messages and sends to DialogflowController
const twitchCallbacks = {
    processChatMessage: dfController.queryAgent
}
const twitchBot = new TwitchBot(propertyObject.twitchBotConfig, twitchCallbacks);
twitchBot.start();