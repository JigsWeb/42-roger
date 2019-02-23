#!/bin/sh

SSH_PORT="4242"
SSHD_CONF_FILE_LOC="/etc/ssh/sshd_config"

sudo apt-get install ssh
sudo sed -i -e 's/#Port 22/Port '$SSH_PORT'/g;' $SSHD_CONF_FILE_LOC
sudo service ssh restart
mkdir -p ~/.ssh

echo "SSH on port 4242, please upload your id_rsa.pub via scp in ~/.ssh/authorized_keys, and run ssh2.sh"
