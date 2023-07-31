#!/bin/bash


PROJECT_PATH=$1
# Check if project path argument is provided
if [ $# -eq 0 ]; then
    PROJECT_PATH="/mangaGoExtractor" # to replace if necessary
fi


# Define cleanup function
cleanup() {
    echo "An error occurred. Cleaning up..."
    # Uninstall Node.js and npm
    brew uninstall node
    # Uninstall Homebrew
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
    # Remove all node modules
    rm -rf "$PROJECT_PATH/node_modules"
    exit 1
}

# Trap errors and call cleanup function
trap 'cleanup' ERR

# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js and npm using Homebrew
brew install node

# Change to the project directory
cd "$PROJECT_PATH"

# Install dependencies
npm install

# Build the project
# npm run build

# Run the project
npm start

# Cleanup on successful completion
cleanup
