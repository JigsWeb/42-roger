#!/bin/sh

curl -sL https://deb.nodesource.com/setup_11.x | bash -
apt-get install -y nginx nodejs

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

cp assets/self-signed.conf /etc/nginx/snippets/self-signed.conf
cp assets/ssl-params.conf /etc/nginx/snippets/ssl-params.conf

cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.bak