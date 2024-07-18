# Game State Integration

The repository contains two folders 
- backend
- frontend

## Backend

The backend is build using **Fastify** a web framework for **NodeJs**

To run the project we need to follow the following steps.

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
to ensure if the request coming from a valid service.

### Step 3

To run the project run the below command
```
npm start
```

you can access the server at [http://127.0.0.1:3000](http://127.0.0.1:3000)

## Frontend

The frontend is build using **React**.

The frontend is representing the picks, bans, current timer and once the drafts end, 
it will also show which hero has been picked by which player.

To run the project we need to follow the following steps.

### Step 1
Go to the project directory **frontend** folder and run the following command
```
npm i
```

### Step 2

Update the .env.local if required

```
REACT_APP_SOCKET_SERVER_URL="http://127.0.0.1:3000"
PORT=3001
```

As my **backend** is running on port 3000, I am running my frontend on 3001 to avoid port conflicts
we can run it on any port as required.

The **REACT_APP_SOCKET_SERVER_URL** is the **socket.io** server URL.

The url for it, is the url of your backend, so if your backend is running on

http://127.0.0.1:3000, this should be the url you should put here.

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

