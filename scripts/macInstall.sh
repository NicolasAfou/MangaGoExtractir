#!/bin/bash


PROJECT_PATH=$1
# Check if project path argument is provided
if [ $# -eq 0 ]; then
    PROJECT_PATH="/mangaGoExtractor" # to replace if necessary
fi


# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js and npm using Homebrew
brew install node

# Change to the project directory
cd "$PROJECT_PATH"

# Install dependencies
npm install

# Build the project
npm run build

# Run the project
npm start
