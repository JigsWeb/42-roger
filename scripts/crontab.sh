#!/bin/sh

COMMAND="sh /etc/updater.sh > /var/log/update_script.log"

sudo cp scripts/updater.sh /etc/updater.sh
sudo echo "0 4 0 0 1 amoynet $COMMAND" >> /etc/crontab
sudo echo "@reboot amoynet $COMMAND" >> /etc/crontab