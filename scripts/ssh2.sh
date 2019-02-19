#!/bin/sh

SSH_PORT="4242"
SSHD_CONF_FILE_LOC="/etc/ssh/sshd_config"

sudo cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
sudo sed -i -e 's/#PasswordAuthentication yes/PasswordAuthentication no/g;
	s/#PermitRootLogin prohibit-password/PermitRootLogin no/g;' $SSHD_CONF_FILE_LOC