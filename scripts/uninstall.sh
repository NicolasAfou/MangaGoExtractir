 #!/bin/bash


 PROJECT_PATH=$1
# Check if project path argument is provided
if [ $# -eq 0 ]; then
    PROJECT_PATH="/mangaGoExtractor" # to replace if necessary
fi

 
 # Uninstall Node.js and npm
brew uninstall node
# Uninstall Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
# Remove all node modules
rm -rf "$PROJECT_PATH/node_modules"