#!/bin/bash

echo "" > ganache-cli.log

ganache-cli --gasLimit 7000001 --mnemonic "$(cat private/wallet.mnemonic)" >> ganache-cli.log &

time sleep 2.0 > /dev/null

tail -n 10 -f ganache-cli.log