# Dialogflow Twitch Bot

The goal of this project is to create a Twitch bot (a fake user for twitch.tv that will respond to actual users' messages/commands) through Dialogflow, a service that allows the creation of an agent that follows a definable conversational model. 

**Note:** if you are looking to create a Twitch bot, Dialogflow may not be the service for you. It provides a lot of complexity even if the exact things you want to accomplish are easy. If you are still interested in applying this service to your Twitch stream, continue below. 

## Current Release

This release, 0.1.0, sends a given query to the Dialogflow agent specified in the properties file. If both the Dialogflow agent and the authentication related to the agent's Google Cloud Project are set up properly, the expected response should be sent back to the machine running this code and printed to the console. This current release uses the code listed on the official Node.js V2 API github ( https://github.com/dialogflow/dialogflow-nodejs-client-v2#using-the-client-library )

## Set up

As mentioned above, certain steps must be taken for this project to work. These are the exact steps to be taken:

1. Create the Dialogflow agent
	- Go to https://console.dialogflow.com . Create an account, then an agent.
	- Create an intent (name it anything). Add some examply input and the response of "Hi, welcome to the stream." (or a different response)
	
2. Configure the associated Google Cloud Project to work properly (please follow https://github.com/dialogflow/dialogflow-nodejs-client-v2#quickstart , specifically the section "Before you begin". The steps there are reposted more simply below)
	- Go to the associated Google Cloud Project ( https://console.cloud.google.com )
	- Enable billing (not enabling will cause future project wonkieness and complete failure)
	- Enable Dialogflow API
	- Set up authentication with a service account
	- Authentication may not work as is, so additional steps may need to be taken through Google Cloud services:
		- Download Google Cloud SDK: https://cloud.google.com/sdk/docs/#install_the_latest_cloud_tools_version_cloudsdk_current_version
		- Once 'gcloud' is available to cmd prompt/terminal, enter 'gcloud auth application-default login' (solution from https://stackoverflow.com/questions/42043611/could-not-load-the-default-credentials-node-js-google-compute-engine-tutorial )


3. Download/clone this project & configure
	- Create a 'properties.json' file.
	- Add the following text: 
	
	```javascript
	{
		"dialogflowAgentId": "YOUR-AGENT-ID-HERE",
		"sampleQuery": "YOUR-QUERY-HERE"
	}
	```
	-The replace the property values as such:
		-'YOUR-AGENT-ID-HERE' with your Dialogflow agent id (accessible via Dialogflow console):
		-'YOUR-QUERY-HERE' with the sample input you added to the Dialogflow agent
4. Install Node.js 

5. run 'npm install' within the project directory

6. run 'node index.js'

Result should be:
	"Query: YOUR-QUERY-HERE \n
	Response: Hi, welcome to the stream."
	
## Project Dependencies:
 - dialogflow js module 
