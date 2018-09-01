# Dialogflow Twitch Bot

The goal of this project is to create a Twitch bot (a fake user for twitch.tv that will respond to actual users' messages/commands) through Dialogflow, a service that allows the creation of an agent that follows a definable conversational model. 

**Note:** if you are looking to create a Twitch bot, Dialogflow may not be the service for you. It provides a lot of complexity even if the exact things you want to accomplish are easy. If you are still interested in applying this service to your Twitch stream, continue below. 

## Current Release

The current release is 0.2.0. Once started, the application connects the Twitch bot-account, the Twitch channel and the Dialogflow agent (all specified in the properties file) such that all chat messages are sent to the agent and then the responses from the agent are posted by the bot. This current release used the code listed on the official Node.js V2 API github ( https://github.com/dialogflow/dialogflow-nodejs-client-v2#using-the-client-library )

## Set up

As mentioned above, certain steps must be taken for this project to work. These are the exact steps to be taken:

1. Create the Dialogflow agent
	- Go to https://console.dialogflow.com . Create an account, then an agent.
	- Create an intent (name it anything). Add some example input (e.g. 'hello') and some response (e.g. "Hi, welcome to the stream.")
	
2. Configure the associated Google Cloud Project to work properly (please follow https://github.com/dialogflow/dialogflow-nodejs-client-v2#quickstart , specifically the section "Before you begin". The steps there are reposted more simply below)
	- Go to the associated Google Cloud Project ( https://console.cloud.google.com )
	- Enable billing (not enabling will cause future project wonkieness and complete failure)
	- Enable Dialogflow API
	- Set up authentication with a service account
	- Authentication may not work as is, so additional steps may need to be taken through Google Cloud services:
		- Download Google Cloud SDK: https://cloud.google.com/sdk/docs/#install_the_latest_cloud_tools_version_cloudsdk_current_version
		- Once 'gcloud' is available to cmd prompt/terminal, enter 'gcloud auth application-default login' (solution from https://stackoverflow.com/questions/42043611/could-not-load-the-default-credentials-node-js-google-compute-engine-tutorial )

3.	Create and configure your Twitch bot account
	- Create twitch channel
	- Go here and connect the account: https://twitchapps.com/tmi/
	- Authorize and you'll be provided with an oauth password. ** NOTE: ** When using this OAuth password, make sure that the 'oauth' portion of the code is copied too.

4. Download/clone this project & configure
	- Create a 'properties.json' file to root directory (i.e. in the folder with the README in it).
	- Add the following text: 
	
	```javascript
	{
		"dialogflowConfig": {
			"agentId": "YOUR-AGENT-ID-HERE",
			"sessionId": "super-cool-test-ses"
		},

		"twitchBotConfig": {
			"options": {
			},

			"connection": {
				"secure": true
			},

			"identity": {
				"username": "YOUR-BOT-ACCOUNT-HERE",
				"password": "YOUR-BOTS-OAUTH-PASSWORD-HERE"
			},

			"channels": ["#YOUR-TWITCH-CHANNEL-HERE"]
		}
	}
	```
	-The replace the property values as such:
		-'YOUR-AGENT-ID-HERE' with your Dialogflow agent id (accessible via Dialogflow console):
		-'YOUR-BOT-ACCOUNT-HERE' with the Twitch channel that you'd like to act as your bot (i.e. the channel to post responses)
		-'YOUR-BOTS-OAUTH-PASSWORD-HERE' with the bot channel's oauth password. 
		
5. Install Node.js 

6. run 'npm install' within the project directory

7. run 'node index.js'

Result (using example above) should be:
	"Query: hi \n
	Response: Hi, welcome to the stream."
	
## Project Dependencies:
 - dialogflow js module 
