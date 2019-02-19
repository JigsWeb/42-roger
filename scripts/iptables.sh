#!/bin/sh

sudo mv ./iptables /etc/network/if-pre-up.d/
sudo chmod +x /etc/network/if-pre-up.d/iptables
