//Diaglogflow Request code taken from https://github.com/dialogflow/dialogflow-nodejs-client-v2#quickstart

'use strict';

//modules
const fs = require('fs');   //to read JSON files
const dfc = require('./dialogflow/DialogflowController.js'); //our simple interface to Dialogflow
const tmi = require('tmi.js'); //for twitch integration

//Load properties
const propertyObject = JSON.parse(fs.readFileSync('properties.json'));

//Dialogflow details
const dfConfig = propertyObject.dialogflowConfig;
const dfId = dfConfig.agentId;
const dfSessionId = dfConfig.sessionId;

//Twitch bot details
const twitchBotConfig = propertyObject.twitchBotConfig;
const twitchClient = new tmi.client(twitchBotConfig);
twitchClient.connect();

//Dialogflow controller
const dfController = new dfc(dfId, dfSessionId); //controller provides access to the agent

//Print function for dialogflow response
function printResponse(response){
    console.log("Query: " + response.queryText);
    console.log("Response: " + response.fulfillmentText);
}

//Function to run when chat message is received
function onMessage(sendingUser, userstate, message, self){
    console.log(`message '${message}' from ${sendingUser}`);
    console.log("sending to diaglogflow...");
    dfController.queryAgent(message, printResponse);
}
twitchClient.on("message", onMessage);


