#!/bin/sh

PACKAGES="sudo ssh"

su -c "apt-get install $PACKAGES" root

echo "Installation des packages [OK]"

su -c "usermod -a -G sudo $USER" root

echo "\nAdd $USER to sudo group... [OK]"

NETWORK_INTERFACES_FILE_LOC="/etc/network/interfaces"
IP_R="$(sudo ip r)"
INTERFACE_NAME="$(echo $IP_R | awk '{print $5}')"
NETWORK="$(echo $IP_R | awk '{print $6}' | awk -F/ '{print $1}')"
IP="$(echo $IP_R | awk '{print $NF}')"
GATEWAY="$(echo $IP_R | awk '{print $3}')"
BROADCAST="$(ip addr show $INTERFACE_NAME | grep inet | head -1 | awk '{print $4}')"
NETMASK="255.255.255.252"

echo -n "Network interface configuration... "

sudo sh -c "sed -i 's/$INTERFACE_NAME/'$INTERFACE_NAME'/g;
	s/$NETWORK/'$NETWORK'/g;
	s/$GATEWAY/'$GATEWAY'/g;
	s/$BROADCAST/'$BROADCAST'/g;
	s/$NETMASK/'$NETMASK'/g;
	s/$IP/'$IP'/g;' interfaces"
sudo cat interfaces > $NETWORK_INTERFACES_FILE_LOC

echo "[OK]"
echo -n "Network interface restarting... "

sudo ifdown $INTERFACE_NAME > /dev/null 2>&1
sudo ifup -v $INTERFACE_NAME > /dev/null 2>&1

echo "[OK]"

SSH_PORT="4242"
SSHD_CONF_FILE_LOC="/etc/ssh/sshd_config"

echo -n "SSH Configuration... "

sudo sh -c "sed -i 's/#Port 22/Port '$SSH_PORT'/g;
	s/PasswordAuthentication yes/PasswordAuthentication no/g;
	s/#PermitRootLogin no/PermitRootLogin no/g;' $SSHD_CONF_FILE_LOC"

sudo service ssh restart

echo "[OK]"

echo -n "Firewall configuration... "

sudo mv ./iptables /etc/network/if-pre-up.d/
sudo chmod +x /etc/network/if-pre-up.d/iptables

echo  "[OK]"