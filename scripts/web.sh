#!/bin/sh

sudo apt-get install curl software-properties-common
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
apt-get install -y nginx nodejs

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

cp assets/self-signed.conf /etc/nginx/snippets/self-signed.conf
cp assets/ssl-params.conf /etc/nginx/snippets/ssl-params.conf

cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.bak
cp assets/nginx-default /etc/nginx/sites-available/default

service nginx restart

npm install -g bower nodemon

cp -R assets/html /var/www
(cd /var/www/html && sudo bower --allow-root install)

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb http://repo.mongodb.org/apt/debian stretch/mongodb-org/4.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list

sudo apt-get update
sudo apt-get install mongodb-org
sudo service mongod start
mongorestore --collection users --db ssui assets/dump/ssui/users.bson

cp -R assets/api /opt
(cd /opt/api && sudo npm install)
