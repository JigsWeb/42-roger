#!/bin/sh

# Remove all rules
sudo iptables -P INPUT ACCEPT
sudo iptables -P OUTPUT ACCEPT
sudo iptables -t mangle -F
sudo iptables -t mangle -X
sudo iptables -t nat -F
sudo iptables -t nat -X
sudo iptables -X
sudo iptables -F

# On est pas un putain de routeur
iptables -P FORWARD DROP

# Block packet to other destionation than port 4242 and 80 (web)
sudo iptables -mangle -A INPUT -p tcp --match multiport ! --dports 22,80,443 -j DROP

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

# Port scanning protection

sudo iptables -t mangle -A PREROUTING -p tcp --tcp-flags FIN,SYN,RST,PSH,ACK,URG NONE -j DROP 
sudo iptables -t mangle -A PREROUTING -p tcp --tcp-flags FIN,SYN FIN,SYN -j DROP 
sudo iptables -t mangle -A PREROUTING -p tcp --tcp-flags SYN,RST SYN,RST -j DROP 
sudo iptables -t mangle -A PREROUTING -p tcp --tcp-flags FIN,RST FIN,RST -j DROP 
sudo iptables -t mangle -A PREROUTING -p tcp --tcp-flags FIN,ACK FIN -j DROP 
sudo iptables -t mangle -A PREROUTING -p tcp --tcp-flags ACK,URG URG -j DROP 
sudo iptables -t mangle -A PREROUTING -p tcp --tcp-flags ACK,FIN FIN -j DROP 
sudo iptables -t mangle -A PREROUTING -p tcp --tcp-flags ACK,PSH PSH -j DROP 
sudo iptables -t mangle -A PREROUTING -p tcp --tcp-flags ALL ALL -j DROP 
sudo iptables -t mangle -A PREROUTING -p tcp --tcp-flags ALL NONE -j DROP 
sudo iptables -t mangle -A PREROUTING -p tcp --tcp-flags ALL FIN,PSH,URG -j DROP 
sudo iptables -t mangle -A PREROUTING -p tcp --tcp-flags ALL SYN,FIN,PSH,URG -j DROP 
sudo iptables -t mangle -A PREROUTING -p tcp --tcp-flags ALL SYN,RST,ACK,FIN,URG -j DROP

# Block ICMP packets

sudo iptables -t mangle -A PREROUTING -p icmp -j DROP

# Block fragmented packets

sudo iptables -t mangle -A PREROUTING -f -j DROP

# Limit TCP connections

sudo iptables -A INPUT -p tcp -m connlimit --connlimit-above 80 -j REJECT --reject-with tcp-reset

# Limit TCP connections/second

sudo iptables -A INPUT -p tcp -m conntrack --ctstate NEW -m limit --limit 60/s --limit-burst 20 -j ACCEPT 
sudo iptables -A INPUT -p tcp -m conntrack --ctstate NEW -j DROP

# Limit TCP reset connection/second

sudo iptables -A INPUT -p tcp --tcp-flags RST RST -m limit --limit 2/s --limit-burst 2 -j ACCEPT 
sudo iptables -A INPUT -p tcp --tcp-flags RST RST -j DROP

# Create pre-up rule on network interface for make iptables rules persistent

sudo iptables-save > /etc/iptables.rules.v4
sudo echo "    pre-up iptables-restore /etc/iptables.rules.v4" >> /etc/network/interfaces