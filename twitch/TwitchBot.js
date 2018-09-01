'use strict';
const tmi = require('tmi.js');


class TwitchBot{

    constructor(botConfig, dfController){
        this.client = new tmi.client(botConfig); //The client, i.e., the bot itself
        this.dfController = dfController;
    }

    start(){
        this.client.connect(); //Connect to the channels
        this.client.on("message", this._onMessage.bind(this));
    }

    //On worthy messages, print the details locally, send to dialogflow agent and send agent's response to chat
    _onMessage(channel, userstate, message, self){
        //ignore unworthy messages
        if(!this._isMessageWorthy(message) || self) return;
    
        //Print message details
        let senderUsername = this._getUser(userstate);
        console.log(`message '${message}' from ${senderUsername} on channel ${channel}`);
        console.log("sending to diaglogflow...");
    
        //Send message to dialogflow, print to chat
        this._sendMessageToDialogflow(message, this._postResponseToChat.bind(this, channel));
    }

    //Returns true only if message is worthy enough for agent
    _isMessageWorthy(message){
        return (message     //message exists
            && message.trim().length > 0 //message isn't whitespace
            && message.length <= 25); //message isn't more than 25 char (problem with emotes???)
    }

    //Gets username given userstate
    _getUser(userstate){
        return userstate['username'];
    }

    _postResponseToChat(channel, responseText){
        this.client.say(channel, responseText);
    }

    //Sends given message to dialogflow agent and runs callback on response text
    _sendMessageToDialogflow(message, callback){
        this.dfController.queryAgent(message, callback);
    }
}

//Export
module.exports = TwitchBot;