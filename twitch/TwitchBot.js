'use strict';
const tmi = require('tmi.js');

function TwitchBot(botConfig, dfController){
    this.client = new tmi.client(botConfig); //The client, i.e., the bot itself
    this.dfController = dfController;
}

TwitchBot.prototype.start = function(){
    this.client.connect(); //Connect to the channels

    /* private functions to handle each message */

    //Posts given message to chat
    function postResponseToChat(channel, responseText){
        this.client.say(channel, responseText);
    }

    //Sends given message to dialogflow agent and runs callback on response text
    function sendMessageToDialogflow(message, callback){
        this.dfController.queryAgent(message, callback)
    }

    //Returns true only if message is worthy enough for agent
    function isMessageWorthy(message){
        return (message     //message exists
            && message.trim().length > 0 //message isn't whitespace
            && message.length <= 25); //message isn't more than 25 char (problem with emotes???)
    }

    //Gets username given userstate
    function getUser(userstate){
        return userstate['username'];
    }

    //On worthy messages, print the details locally, send to dialogflow agent and send agent's response to chat
    function onMessage(channel, userstate, message, self){
        //ignore unworthy messages
        if(!isMessageWorthy(message) || self) return;

        //Print message details
        let senderUsername = getUser(userstate);
        console.log(`message '${message}' from ${senderUsername} on channel ${channel}`);
        console.log("sending to diaglogflow...");

        //Send message to dialogflow, print to chat
        sendMessageToDialogflow.call(this, message, postResponseToChat.bind(this, channel));

    }
    this.client.on("message", onMessage.bind(this));
}

//Export
module.exports = TwitchBot;