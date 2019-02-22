#!/bin/sh

COMMAND="apt-get update && apt-get upgrade"

sudo cp scripts/updater.sh /etc/updater.sh
sudo sh -c 'echo "0 4 0 0 1 amoynet $COMMAND" >> /etc/crontab'
sudo sh -c 'echo "@reboot amoynet $COMMAND" >> /etc/crontab'