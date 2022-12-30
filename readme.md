# TODO validate all commands

```brew tap heroku/brew && brew install heroku```

install nvm

```heroku login```

git clone https://github.com/brohde/sf-city-hall-lights.git

heroku git remote -a sf-city-hall-lights

nvm use #TODO

npm run watch (live reload mode)
npm run web (regular dev mode)
    # Should mirror heroku local 

Deployment to prod

git push heroku <brand-name>:master

# TODO add in deploy on merge to master?

Deploying a test dyno (dev server)
# TODO

Notion Token
https://www.notion.so/my-integrations
https://www.notion.so/my-integrations/internal/ac0d3fd3354349d0883d7706b562cec3

Locally, you may use `.env` to define enviromment variables that will be set at run time.

```
NOTION_TOKEN=Internal Integration Token
```

Services

web - API
worker - web scraper
