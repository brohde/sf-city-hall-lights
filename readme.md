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

Services

web - API
worker - web scraper
