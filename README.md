
## Install & run dev
```
git clone https://github.com/saigonbitmaster/bLearnCms
add local host dns record /etc/hosts: 127.0.0.1  blearn.bworks.app
cd bLearnCms
yarn 
yarn build-lib
yarn backend
yarn frontend
```

## Build & run app
```
git clone https://github.com/saigonbitmaster/bLearnCms
cd bLearnCms
yarn 
yarn build-lib
yarn build-frontend
yarn build-frontend

frontend app after build can be run by any http server e.g nginx server
backend app after build can be run by: node main.js or pm2
```

## change the API urls for frontend
```
frontend/App.tsx -> change the loginUrl and  apiUrl to meet your deployment before build apps e.g:
const loginUrl = "http://blearn.bworks.app:3000/auth/login";
const apiUrl = "http://blearn.bworks.app:3000";
```