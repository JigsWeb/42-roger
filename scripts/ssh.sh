#!/bin/sh

SSH_PORT="4242"
SSHD_CONF_FILE_LOC="/etc/ssh/sshd_config"

sudo sed -i -e 's/#Port 22/Port '$SSH_PORT'/g;
	s/#PasswordAuthentication yes/PasswordAuthentication no/g;
	s/#PermitRootLogin prohibit-password/PermitRootLogin no/g;' $SSHD_CONF_FILE_LOC

sudo service ssh restart
