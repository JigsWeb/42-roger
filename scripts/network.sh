#!/bin/sh

NETWORK_INTERFACES_FILE_LOC="/etc/network/interfaces"
IP_R="$(sudo ip r)"
INTERFACE_NAME="$(echo $IP_R | awk '{print $5}')"
NETWORK="$(echo $IP_R | awk '{print $6}' | awk -F/ '{print $1}')"
IP="$(echo $IP_R | awk '{print $14}')"
GATEWAY="$(echo $IP_R | awk '{print $3}')"
BROADCAST="$(ip addr show $INTERFACE_NAME | grep inet | head -1 | awk '{print $4}')"
NETMASK="255.255.255.252"
sudo sed -i -e 's/${INTERFACE_NAME}/'$INTERFACE_NAME'/g;
	s/${NETWORK}/'$NETWORK'/g;
	s/${GATEWAY}/'$GATEWAY'/g;
	s/${BROADCAST}/'$BROADCAST'/g;
	s/${NETMASK}/'$NETMASK'/g;
	s/${IP}/'$IP'/g;' assets/interfaces
sudo sh -c "cat assets/interfaces > $NETWORK_INTERFACES_FILE_LOC"
sudo ifdown $INTERFACE_NAME > /dev/null 2>&1
sudo ifup -v $INTERFACE_NAME > /dev/null 2>&1
