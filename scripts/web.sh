#!/bin/sh

sudo apt-get install nginx apache2-utils

sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

cp assets/self-signed.conf /etc/nginx/snippets/self-signed.conf
cp assets/ssl-params.conf /etc/nginx/snippets/ssl-params.conf

sudo htpasswd -c /etc/nginx/.htpasswd $USER

sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.bak
sudo cp assets/nginx-default /etc/nginx/sites-available/default

sudo service nginx restart