#!/bin/sh

SSHD_CONF_FILE_LOC="/etc/ssh/sshd_config"

sudo sed -i -e 's/#PasswordAuthentication yes/PasswordAuthentication no/g;
	s/#PermitRootLogin prohibit-password/PermitRootLogin no/g;' $SSHD_CONF_FILE_LOC
sudo service ssh restart

echo "SSH Configuation [OK]"
