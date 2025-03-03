#!/bin/bash

# Check if RPC_URL is provided as an environment variable
if [ -z "$RPC_URL" ]; then
  echo "Error: RPC_URL environment variable is required"
  echo "Usage: RPC_URL=<your-base-sepolia-rpc-url> ./scripts/anvil-fork.sh"
  exit 1
fi

# Print info
echo "Starting Anvil with Base Sepolia fork"
echo "RPC URL: $RPC_URL"

# Start Anvil with Base Sepolia fork
# Default port: 8545
# Block time: 1 second
# Chain ID: 84532 (Base Sepolia)
anvil \
  --fork-url $RPC_URL \
  --chain-id 84532 \
  --block-time 1 \
  --gas-limit 30000000 \
  --port 8545 \
  "$@"
