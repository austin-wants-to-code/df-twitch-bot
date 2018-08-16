'use strict';

//modules
const fs = require('fs');   //to read JSON files
const dfc = require('./dialogflow/DialogflowController.js'); //our simple interface to Dialogflow
const tb = require('./twitch/TwitchBot.js'); //represents the twitch bot

//Load properties
const propertyObject = JSON.parse(fs.readFileSync('properties.json'));

//Dialogflow setup
const dfConfig = propertyObject.dialogflowConfig;
const dfController = new dfc(dfConfig); //controller provides access to the agent

//Twitch bot setup
const twitchBotConfig = propertyObject.twitchBotConfig;
const twitchBot = new tb(twitchBotConfig, dfController);
twitchBot.start();
