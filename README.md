## Install & run dev

```
git clone https://github.com/saigonbitmaster/creport_2.0
add local host dns record /etc/hosts: 127.0.0.1  creport.bworks.app
cd creport_2.0
update .env files
yarn
yarn build-lib
yarn api
yarn cms
yarn web
```

## Build & run app

```
git clone https://github.com/saigonbitmaster/creport_2.0
cd creport_2.0
yarn
yarn build-lib
yarn build-api
yarn build-cms
yarn build-web

frontend app after build can be run by any http server e.g nginx server
backend app after build can be run by: node main.js or pm2
```

## frontend .env files: cms/.env, web/.env: change below api urls to reflect the production domains.

```
REACT_APP_LOGIN_URL=http://localhost:3000/auth/login
REACT_APP_API_URL=http://localhost:3000
REACT_APP_RENEW_ACCESS_TOKEN_URL=http://localhost:3000/auth/refresh
REACT_APP_LOGOUT_URL=http://localhost:3000/auth/logout
REACT_APP_DONATE_ADDRESS=addr_***
```

## frontend .env files: web/.env: change below api urls to reflect the production domains.

```
REACT_APP_API_URL=http://localhost:3000
REACT_APP_DONATE_ADDRESS=addr_***
```

## api .env api/.env

```
#Mongo
CONNECTION_STRING=mongodb://admin:***@localhost:27017/creport2?authSource=admin&readPreference=primary
#Blockfrost
BLOCKFROST_PROJECT_ID=***
BLOCKFROST_URL=https://cardano-preprod.blockfrost.io/api/v0
#GitHub
GITHUB_TOKEN=***

#jwt settings
JWT_TOKEN_EXPIRE=60m
JWT_RENEW_TOKEN_EXPIRE=7d
JWT_TOKEN_SECRET=secret
JWT_REFRESH_TOKEN_SECRET=***
JWT_VERIFY_TOKEN_SECRET=***


```

## googleSheets url to import data

```
https://docs.google.com/spreadsheets/d/1WJi1odv0vGT3ylz01flNpqErmCr-G6Kb37yxaVZOzVM/edit#gid=165710495

if token is expired, delete token.json then restart api, google will request access via web then recreate new token.json 

```


## googleSheets url to show data e.g catalyst report

```
Make o copy of catalyst report googleSheets https://docs.google.com/spreadsheets/d/1bfnWFa94Y7Zj0G7dtpo9W1nAYGovJbswipxiHT4UE3g/edit#gid=495459176 to your drive, where you have right to publish the sheet to web.
From copied sheet: File -> Share -> Public to the web
Get published url then add to cms settings with key "catalystReport"

```


## updated documents

```
https://docs.google.com/document/d/e/2PACX-1vRwkXj9E0jY0AZUaI7XfYbupl6sZWEmWoggVDMW1VwzG16DU4xL0a-wVwVxJzFM2P2rxOZrBlOh0nkY/pub

```