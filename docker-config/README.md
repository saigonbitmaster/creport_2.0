# These are instructions to run/deploy creport on AWS VM instance or any Linux self hosted (with docker & node 16 installed), you will need:

## Nginx service - proxy for CMS and WEB app
## Certbot service for free Let's encrypt certificate - if you want to use https

Edit nginx/conf/custom.conf to reflect the production domains

To create certificate first time:
```
docker compose up -d
# edit nginx/conf/custom.conf
    #listen 443 ssl http2;
    #ssl_certificate
    #ssl_certificate_key
    listen 443;
docker restart nginx
# Generate certificate first time by run command
docker exec -it certbot certonly --webroot --webroot-path /var/www/certbot/ -d example.org
# Check certbot/conf/live/yourdomain to see if pub and priv key certs are created , for more information : https://mindsers.blog/post/https-using-nginx-certbot-docker/
# edit nginx/conf/custom.conf and restart nginx again
```

## Mongodb & Redis service for API

Create docker-config/.env file
```
# mongodb require environment variables for init
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=your strong password # same password with CONNECTION_STRING of api

# api require mongodb uri environment variables
CONNECTION_STRING=mongodb://admin:***@mongo:27017/creport2?authSource=admin&readPreference=primary
```
