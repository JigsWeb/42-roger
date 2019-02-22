#!/bin/sh

su -c "apt-get install sudo" root
su -c "usermod -aG sudo $USER" root
su - $USER
