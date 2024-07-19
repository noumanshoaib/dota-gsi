# Game State Integration
The purpose of this project to build a communication between frontend <> backend <> GSI

## Assumptions
1. There will be one client communicating with the backend, so the backend does not support multiple clients speaks to it for now.
2. All the three systems have smooth connection with each other backend <> GSI <> frontend
3. As different unique auth tokens can also be used to define multiple different clients for identification (as I read in one of the shared resources in the assessment), in my case, I am just considering one client, also I am validating requests coming to the server if they match the auth token from the client. Just to show a good practise to allow only valid clients. (it can be unnecessary depending on different scenarios)
## Notes
1. The project only works with the drafting of captains mode in dota 2.
2. Real-time communication can be achieved using various methods such as WebSockets, Server-Side Events, Long Polling etc. In this case, WebSockets (socket.io) are used.
3. I have seen multiple implementation of **GSI** using events (event driven) which is more modular and scalable approach, where we emit data when we receive it from the game client which enable us to subscribe to certain data attributes coming from **GSI** based on our needs, I like the approach as well, as it makes the code more modular, scalable, maintainable and reusable, and we can write business logic based on specific attributes changes in clean manner, but I just implement a simplified approach to complete the task, by assuming it a small and simple application for the assessment, I am passing everything as it is coming from the game client after transforming the response into a better data structure, so it is simpler for the frontend to understand.

The repository contains two folders:
1. backend
2. frontend

## Backend

The backend is build using **Fastify** a web framework for **NodeJs**

### Running the backend

### Step 1

Go to the project directory inside **backend** folder and run the following command

```
//installing the node modules
npm i
```
### Step 2

Rename .env.example to .env, it contains the below env variables

```
AUTH_TOKEN=NoumanTest
PORT=3000
```

The **AUTH_TOKEN** should match with the **AUTH TOKEN** of gamestate integration file

The backend is verifying the AUTH.TOKEN coming from the game stats object 
that is getting **POST** to our backend service
to ensure if the request coming from a valid client.

### Step 3

To run the project run the below command
```
npm start
```

you can access the server at [http://127.0.0.1:3000](http://127.0.0.1:3000)

## Frontend

The frontend is built using **React**. It represents the picks, bans, current timer, and once the drafts end, it will also show which hero has been picked by which player.

### Running the Frontend

### Step 1
Go to the project directory **frontend** folder and run the following command to install node modules
```
npm i
```

### Step 2

Update the .env.local if required

```
REACT_APP_SOCKET_SERVER_URL="http://127.0.0.1:3000"
PORT=3001
```

As the **backend** is running on port 3000, the frontend is set to run on port 3001 to avoid port conflicts. You can run it on any port as required.

The **REACT_APP_SOCKET_SERVER_URL** should be the socket.io server URL, which is the URL of your backend. So, if your backend is running on http://127.0.0.1:3000, this should be the URL you put here.

## Final Step - Enabling Game State Integration (GSI) for Dota 2

Enabling GSI is a two-step process. First, instruct the game client to enable GSI by following these steps:

1. Open Steam and navigate to your library.
2. Right-click on Dota 2 and select `Properties`.
3. Click on the `General` tab.
4. In the `Launch Options` field, enter `-gamestateintegration`.

Next, you need to create a configuration file that the game client can parse. Here’s how to do it:

1. Navigate to your Dota 2 directory for example: `YOUR_STEAM_DIRECTORY\steamapps\common\dota 2 beta\game\dota\cfg\gamestate_integration\.`
2. Create a file with a name starting with `gamestate_integration_` and ending with `.cfg`. For example, `gamestate_integration_my_service.cfg`.

```
"Configuration description"
{
// Comments can be used
   "uri"               "http://localhost:3002/"
   "timeout"           "5.0"
   "buffer"            "0.1"
   "throttle"          "0.1"
   "heartbeat"         "30.0"
   "data"
   {
       "buildings"     "0"
       "provider"      "0" // disabled
       "map"           "0"
       "player"        "1" // enabled
       "hero"          "1"
       "abilities"     "0"
       "items"         "1"
       "draft"         "0"
       "wearables"     "0"
   }
   "auth"
   {
       "token"         "super_secret"
   }
}
```

Now run the game, start watching a tournament, or download an old tournament match and watch replay.
and check the frontend application for draft updates. :innocent:

