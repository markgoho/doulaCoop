# Doula Cooperative of Rochester
 
Site: https://www.doulacooperative.org

Build: [![CircleCI](https://circleci.com/gh/markgoho/doulaCoop.svg?style=svg)](https://circleci.com/gh/markgoho/doulaCoop)

## Getting Started
```
$ npm run tools
$ firebase login
$ yarn install
$ yarn serve
```

## Development Workflow
1. Create a branch for your updates.
2. Make changes & push to have your

## Development Accounts/Access
Owner: Mark Goho

1. Firebase: https://console.firebase.google.com/project/doulacoop-264dd/hosting/main
2. GitHub: https://github.com/markgoho/doulaCoop 
3. CircleCI: https://circleci.com/gh/markgoho/doulaCoop 
4. Slack: https://johnsongoho.slack.com
5. `.github` && `.circleci` privileges - Only known committers are allowed to submit changes to some files

## Modify the Doula List
1. Branch (recommendation: `<doula-name>`) 
2. Update: src/templates/partials/_doulas.pug
3. Ensure any new profiles have a corresponding jpg and webp file in src/img/headshots (the filename needs to match the name key of the partial). Photos must be 200p wide by 280p tall (see: the-doulas.pug) <- Contact @markgoho for new/updated images. They require special care & handling.
4. Stop your server, then build and serve: `yarn serve`

## Rollback a Bad Deployment
Oh no! Something is very broken!! No worries... put the site back into a working state instantly by selecting the previous configuration here, then clicking rollback:
- https://console.firebase.google.com/project/doulacoop-264dd/hosting/main

## Manual Deploy
WARNING: Don't do this. Make sure your changes are set and the rest of the site is functional.

```
$ yarn deploy
```
