//Diaglogflow Request code taken from https://github.com/dialogflow/dialogflow-nodejs-client-v2#quickstart

'use strict';

//modules
const fs = require('fs');   //to read JSON files
const df = require('dialogflow');   //to work with dialogflow

//Load properties
const propertyObject = JSON.parse(fs.readFileSync('properties.json'));

//Project details
const dfId = propertyObject.dialogflowAgentId;
const dfSessionId = 'test-session-id';
const testQuery = 'hi';
const languageCode = 'en-US';

//Instantiate Dialogflow client
const sessionClient = new df.SessionsClient();

//Define session path
const sessionPath = sessionClient.sessionPath(dfId, dfSessionId);

//Query request
const request ={
    session: sessionPath,
    queryInput: {
        text: {
            text: testQuery,
            languageCode: languageCode,
        },
    },
};

//Send request & log result
sessionClient
    .detectIntent(request) //i.e. perform query
    .then(responses => {
        const result = responses[0].queryResult;
        console.log(`Query: ${result.queryText}`);
        console.log(`Response: ${result.fulfillmentText}`);
    })
    .catch(err => {
        console.log('Error', err);
    });