
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

## .env file for frontend
```
REACT_APP_LOGIN_URL=http://localhost:3000/auth/login
REACT_APP_API_URL=http://localhost:3000
```

## .env file for api 
```
#Mongo
DATABASE_HOST=localhost
DATABASE_PORT=27017
DATABASE_ACCOUNT=admin
DATABASE_PASSWORD=***
#Blockfrost
BLOCKFROST_PROJECT_ID=***
BLOCKFROST_URL=https://cardano-testnet.blockfrost.io/api/v0
#GitHub
GITHUB_TOKEN=***
```