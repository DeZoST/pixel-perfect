#!/bin/sh
if [ -f "RS256.key" ] || [ -f "RS256.key.pub" ]; then
    echo "The key files already exist."
    exit 1
fi
echo "DO NOT SET A PASSWORD, JUST PRESS ENTER"
ssh-keygen -t rsa -b 4096 -m PEM -f RS256.key
openssl rsa -in RS256.key -pubout -outform PEM -out RS256.key.pub
