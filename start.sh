#!/bin/bash

# Change directory to api
cd api

# Install dependencies
yarn install

# Start the application
node app.js &

# Change directory to client
cd ../client

# Install dependencies
yarn install

# Start the application
yarn dev --port=3000 &

# Change directory to layer
cd ../layer

# Install dependencies
yarn install

# Start the application
yarn dev --port=3001 &

# Change directory to xnft
cd ../xnft

# https://github.com/coral-xyz/xnft-quickstart/issues/26
export NODE_OPTIONS=--openssl-legacy-provider

# Install dependencies
yarn install

# Start the application
yarn dev &
