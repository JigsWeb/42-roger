#!/bin/sh

dpkg -l mail > /dev/null 2>&1 || apt-get -y install mailutils
cat /etc/crontab | grep watcher > /dev/null 2>&1 || (cp scripts/watcher.sh /usr/local/watcher.sh && echo '0 0 * * * root sh /usr/local/watcher.sh' >> /etc/crontab)
cat /etc/crontab.old > /dev/null 2>&1 || cat /etc/crontab > /etc/crontab.old

DIFF=$(diff /etc/crontab /etc/crontab.old)

if [ $? = 1 ]; then
	echo $DIFF | mail -s "Crontab watcher" root
	cat /etc/crontab > /etc/crontab.old
fi
