#!/bin/sh


iptables -t mangle -A PREROUTING -s 127.0.0.1/8 -j DROP