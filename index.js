//Diaglogflow Request code taken from https://github.com/dialogflow/dialogflow-nodejs-client-v2#quickstart

'use strict';

//modules
const fs = require('fs');   //to read JSON files
const dfc = require('./dialogflow/DialogflowController.js'); //our simple interface to Dialogflow

//Load properties
const propertyObject = JSON.parse(fs.readFileSync('properties.json'));

//Project details
const dfId = propertyObject.dialogflowAgentId;
const dfSessionId = propertyObject.dialogflowSessionId;
const query = propertyObject.query;

//Result print function
function printResponse(response){
    console.log("Query: " + response.queryText);
    console.log("Response: " + response.fulfillmentText);
}

//Dialogflow query
const dfController = new dfc(dfId, dfSessionId); //controller provides access to the agent
dfController.queryAgent(query, printResponse);

