#!/bin/sh

# Remove all rules
sudo iptables -P INPUT ACCEPT
sudo iptables -P OUTPUT ACCEPT
sudo iptables -P FORWARD ACCEPT
sudo iptables -t mangle -F
sudo iptables -t mangle -X
sudo iptables -t nat -F
sudo iptables -t nat -X
sudo iptables -X
sudo iptables -F

# Block packet from reserved/local IPv4 network
sudo iptables -t mangle -A PREROUTING -s 127.0.0.1/8 -j DROP
sudo iptables -t mangle -A PREROUTING -s 100.64.0.0/10 -j DROP
sudo iptables -t mangle -A PREROUTING -s 169.254.0.0/16 -j DROP
sudo iptables -t mangle -A PREROUTING -s 172.16.0.0/12 -j DROP
sudo iptables -t mangle -A PREROUTING -s 192.0.0.0/24 -j DROP
sudo iptables -t mangle -A PREROUTING -s 192.0.2.0/24 -j DROP
sudo iptables -t mangle -A PREROUTING -s 192.168.0.0/16 -j DROP
sudo iptables -t mangle -A PREROUTING -s 192.18.0.0/15 -j DROP
sudo iptables -t mangle -A PREROUTING -s 198.51.100.0/24 -j DROP
sudo iptables -t mangle -A PREROUTING -s 192.88.99.0/24 -j DROP
sudo iptables -t mangle -A PREROUTING -s 203.0.113.0/24 -j DROP
sudo iptables -t mangle -A PREROUTING -s 224.0.0.0/4 -j DROP
sudo iptables -t mangle -A PREROUTING -s 240.0.0.0/4 -j DROP
sudo iptables -t mangle -A PREROUTING -s 255.255.255.255/32 -j DROP

# Block invalid packets (!= SYN && !TCP_CONNECTION_ESTABLISHED)
sudo iptables -t mangle -A PREROUTING -m conntrack --ctstate INVALID -j DROP
sudo iptables -t mangle -A PREROUTING -p tcp ! --syn -m conntrack --ctstate NEW -j DROP

# Block new packets (Only SYN see previous rules) with dumb MSS value
sudo iptables -t mangle -A PREROUTING -p tcp -m conntrack --ctstate NEW -m tcpmss ! --mss 536:65535 -j DROP

