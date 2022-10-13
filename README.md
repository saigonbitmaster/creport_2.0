
## Install & run dev
```
git clone https://github.com/saigonbitmaster/creport_2.0
add local host dns record /etc/hosts: 127.0.0.1  creport.bworks.app
cd creport_2.0
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

## change the API urls for frontend
```
frontend/App.tsx -> change the loginUrl and  apiUrl to meet your deployment before build apps e.g:
const loginUrl = "http://creport.bworks.app:3000/auth/login";
const apiUrl = "http://creport.bworks.app:3000";
```