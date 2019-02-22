#!/bin/sh

sudo dpkg -l incron
IS_INCRON_INSTALLED=$(echo $?)

if [ IS_INCRON_INSTALLED = "1" ]; then
	sudo apt-get -y install incron
	reset
fi
sudo sh -c 'echo "root" >> /etc/incron.allow'
sudo sh -c "echo '/etc/crontab IN_MODIFY /home/$USER/42-roger/assets/watcher.sh' >> /etc/incron.d/watcher"
sudo service incron restart