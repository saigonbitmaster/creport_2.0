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
```

## api .env api/.env

```
#Mongo
CONNECTION_STRING=mongodb://admin:***@localhost:27017/creport2?authSource=admin&readPreference=primary
#Blockfrost
BLOCKFROST_PROJECT_ID=***
BLOCKFROST_URL=https://cardano-testnet.blockfrost.io/api/v0
#GitHub
GITHUB_TOKEN=***

```

## googleSheets url to import data

```
https://docs.google.com/spreadsheets/d/1WJi1odv0vGT3ylz01flNpqErmCr-G6Kb37yxaVZOzVM/edit#gid=165710495

```
