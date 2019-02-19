#!/bin/sh

sh ./scripts/packages.sh
echo "Packages installation [OK]"
sh ./scripts/network.sh
echo "Network interface configuration [OK]"
# sh ./scripts/ssh.sh
# echo "SSH Configuration [OK]"
# sh ./scripts/iptables.sh
# echo "Iptable configuration [OK]"
