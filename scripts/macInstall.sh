#!/bin/bash

# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js and npm using Homebrew
brew install node

# Change to the project directory
cd /path/to/project

# Install dependencies
npm install

# Build the project
# npm run build

# Run the project
npm start

# Uninstall Node.js and npm
brew uninstall node

# Uninstall Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"


# Remove all node modules
rm -rf /path/to/project/node_modules

