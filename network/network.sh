#!/bin/sh

PACKAGES="sudo ssh"

echo "Installation des packages..."

su -c "apt-get install $PACKAGES" root

echo -n "\nWhat the username to add to sudo group ? "

read USERNAME
su -c "usermod -a -G sudo $USERNAME" root

echo "\nAdd $USERNAME to sudo group... [OK]"

NETWORK_INTERFACES_FILE_LOC="/etc/network/interfaces"
IP_R="$(sudo ip r)"
INTERFACE_NAME="$(echo $IP_R | awk '{print $5}')"
NETWORK="$(echo $IP_R | awk '{print $6}' | awk -F/ '{print $1}')"
IP="$(echo $IP_R | awk '{print $NF}')"
GATEWAY="$(echo $IP_R | awk '{print $3}')"
BROADCAST="$(ip addr show $INTERFACE_NAME | grep inet | head -1 | awk '{print $4}')"
NETMASK="255.255.255.252"

echo -n "Network interface configuration... "

sudo sh -c "sed 's/$INTERFACE_NAME/'$INTERFACE_NAME'/g;
	s/$NETWORK/'$NETWORK'/g;
	s/$GATEWAY/'$GATEWAY'/g;
	s/$BROADCAST/'$BROADCAST'/g;
	s/$NETMASK/'$NETMASK'/g;
	s/$IP/'$IP'/g;' interfaces > $NETWORK_INTERFACES_FILE_LOC"

echo "[OK]"
echo -n "Network interface restarting... "

sudo ifdown $INTERFACE_NAME > /dev/null 2>&1
sudo ifup -v $INTERFACE_NAME > /dev/null 2>&1

echo "[OK]"