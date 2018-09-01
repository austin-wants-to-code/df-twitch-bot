//Diaglogflow Request code taken from https://github.com/dialogflow/dialogflow-nodejs-client-v2#quickstart
'use strict';
const df = require('dialogflow');

class DialogflowController{

    constructor(config){
        this.languageCode = 'en-US'; //Default language code

        //Instance vars
        this.agentId = config.agentId;
        this.sessionId = config.sessionId;

        //Client set up instance vars
        this.sessionClient = new df.SessionsClient(); //set up client
        this.sessionPath = this.sessionClient.sessionPath(this.agentId, this.sessionId);//set up session path

        //Bind methods
        this.queryAgent = this.queryAgent.bind(this);
    }

    queryAgent(queryString, callback){
        //Base case (query is empty, is whitespace or does not exist)
        if(!queryString || !queryString.trim()) return;
    
        //Create and send query, perform callback on response json
        this._sendQuery.call(this, this._createQuery.call(this, queryString), callback);
    }

    //Creates query request object given string
    _createQuery(query){
        return {
            session: this.sessionPath,
            queryInput: {
                text: {
                    text: query,
                    languageCode: this.languageCode
                }
            }
        };
    }

    //Sends query
    _sendQuery(req, callback){
        this.sessionClient
            .detectIntent(req) //perform a query request
            .then(responses => {
                const result = responses[0].queryResult; //Get result

                //TODO, returning fulfillment text only removes access to a lot of the returned response.
                callback(result.fulfillmentText); //Run function on result
            })
            .catch(err => console.log('An error has occurred', err));
    }
}

/*
//DialogflowController will have major functionality relating to Dialogflow (such as making and sending requests)
function DialogflowController(config){
    //Instance vars
    this.agentId = config.agentId;
    this.sessionId = config.sessionId;

    //Client set up instance vars
    this.sessionClient = new df.SessionsClient(); //set up client
    this.sessionPath = this.sessionClient.sessionPath(this.agentId, this.sessionId);//set up session path
}

DialogflowController.prototype.languageCode = 'en-US'; //default language code

DialogflowController.prototype.queryAgent = function(queryString, callback){
    //Base case (query is empty, is whitespace or does not exist)
    if(!queryString || !queryString.trim()) return;

    //Creates query string
    function createQuery(query){
        return {
            session: this.sessionPath,
            queryInput: {
                text: {
                    text: query,
                    languageCode: this.languageCode
                }
            }
        };
    };

    //Sends query
    function sendQuery(req, callback){
        this.sessionClient
        .detectIntent(req) //perform a query
        .then(responses => {
            let result = responses[0].queryResult; //Get result

            //TODO, returning fulfillment text only removes access to a lot of the returned response.
            callback(result.fulfillmentText); //Run function on result
        })
        .catch(err => {
            console.log('An error has occurred', err);
        });
    }

    //Create and send query, perform callback on response json
    sendQuery.call(this, createQuery.call(this, queryString), callback);
}*/

//Export
module.exports = DialogflowController;