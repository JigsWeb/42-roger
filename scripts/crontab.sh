#!/bin/sh

COMMAND="apt-get -y update > /var/log/update_script.log && apt-get -y upgrade >> /var/log/update_script.log"

sudo sh -c "echo '0 4 * * 1 root $COMMAND' >> /etc/crontab"
sudo sh -c "echo '@reboot root $COMMAND' >> /etc/crontab"
