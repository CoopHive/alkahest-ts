#!/bin/bash

# Check if RPC_URL is provided as an environment variable
if [ -z "$RPC_URL" ]; then
  echo "Error: RPC_URL environment variable is required"
  echo "Usage: RPC_URL=<your-base-sepolia-rpc-url> ./scripts/test-with-anvil.sh [test-file]"
  exit 1
fi

# Start Anvil in the background
echo "Starting Anvil with Base Sepolia fork..."
./scripts/anvil-fork.sh &
ANVIL_PID=$!

# Wait for Anvil to start
sleep 2

# Run the update-tests script to ensure all tests use Anvil
echo "Updating test files to use Anvil..."
bun ./scripts/update-tests.ts

# Run tests
if [ -z "$1" ]; then
  echo "Running all tests..."
  bun test
else
  echo "Running test: $1"
  bun test "$1"
fi

# Cleanup: Kill Anvil process
echo "Stopping Anvil..."
kill $ANVIL_PID

echo "Tests completed!"