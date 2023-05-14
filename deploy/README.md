Step by step to run/deploy creport_2.0 on AWS VM instance or any Linux self hosted (with docker installed):

- git clone https://github.com/saigonbitmaster/creport_2.0
- cd creport_2.0/deploy
- mkdir -p certbot dbdata
- create .env with below content
```
#Mongo
DATABASE_HOST=localhost
DATABASE_PORT=27017
DATABASE_ACCOUNT=admin
DATABASE_PASSWORD=***
CONNECTION_STRING="mongodb://admin:***@mongo:27017/creport2?authSource=admin&readPreference=primary"
#Blockfrost
BLOCKFROST_PROJECT_ID=***
BLOCKFROST_URL="https://cardano-preprod.blockfrost.io/api/v0"
#GitHub
GITHUB_TOKEN=***

#jwt settings
JWT_TOKEN_EXPIRE=60m
JWT_RENEW_TOKEN_EXPIRE=7d
JWT_TOKEN_SECRET=***
JWT_REFRESH_TOKEN_SECRET=***
JWT_VERIFY_TOKEN_SECRET=***

###search url prod
WEB_SEARCH_BASE_URL="https://creport.bworks.app/web#"
CMS_SEARCH_BASE_URL="https://creport.bworks.app/cms#"

###API urls prod
REACT_APP_LOGIN_URL="https://creport.bworks.app/api/auth/login"
REACT_APP_API_URL="https://creport.bworks.app/api"
REACT_APP_RENEW_ACCESS_TOKEN_URL="https://creport.bworks.app/api/auth/refresh"
REACT_APP_LOGOUT_URL="https://creport.bworks.app/api/auth/logout"

REACT_APP_DONATE_ADDRESS=***
```
- copy .env file to ../cms/ , ../web/ , ../api/ 
- build docker image for frontend (cms+web) and backend api, commands below
```
cd ..
docker build -f deploy/Dockerfile-frontend -t creport-frontend .
docker build -f deploy/Dockerfile-api -t creport-api .
```
- start creport services, commands below
```
cd deploy
docker-compose -f docker-compose.yaml up -d
```
- You need to init certbot certificate for HTTPS (run once only) , please refer this guide: https://mindsers.blog/post/https-using-nginx-certbot-docker/
```
docker exec certbot sh -c 'certonly --webroot --webroot-path /var/www/certbot/ -d creport.bworks.app'
```
- to stop creport service, commands below
```
cd deploy
docker-compose -f docker-compose.yaml down
```

