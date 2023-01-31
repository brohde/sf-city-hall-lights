# SF City Hall Lights 

San Francisco City Hall Lights – what do today's colors mean? This is a node/TypeScript proof-of-concept application that exposes a friendly data format that can be connected to your smart home.  Since the colors change on a daily basis, it would be convient to say "Hey Siri, tell me about the city hall lights." Or, you can use this API to synchronize your smart lights with the ones on City Hall.

## Local installation

1. Install Heroku dependencies and login
```
brew tap heroku/brew && brew install heroku]
heroku login
```

2. Install nvm and node v19 
Follow the instructions here. https://github.com/nvm-sh/nvm
```
nvm install 19
```

3. Clone this repo
```
git clone https://github.com/brohde/sf-city-hall-lights.git
cd sf-city-hall-lights
```

4. Install dependencies
```
yarn
```

5. Set up local environment variables.
See [Additional dependencies](#additional-dependencies)

```
cp .env.example .env
```

## Additional dependencies
1. Access to Notion database, and application keys. See:
* https://www.notion.so/my-integrations
* https://www.notion.so/my-integrations/internal/ac0d3fd3354349d0883d7706b562cec3

## Local commands

Interactive development mode
```
yarn run watch (live reload mode)
```

Build for production
```
yarn run prod
```

## Deployment

```
heroku git remote -a sf-city-hall-lights
git push heroku master
```
