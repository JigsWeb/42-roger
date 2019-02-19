#!/bin/sh

su -c "apt-get install sudo" root
su -c "usermod -a -G sudo $USER" root
su - $USER