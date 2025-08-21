#!/bin/bash

# Install ElizaOS Sei Plugin
pnpm install @elizaos/plugin-sei

# Set environment variables
echo "SEI_PRIVATE_KEY=your_private_key_here" >> .env.local
echo "SEI_NETWORK=testnet" >> .env.local

echo "ElizaOS Sei plugin installed successfully!"
echo "Please update your private key in .env.local"
