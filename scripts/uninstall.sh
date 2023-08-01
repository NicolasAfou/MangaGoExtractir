 # Uninstall Node.js and npm
brew uninstall node
# Uninstall Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
# Remove all node modules
rm -rf "$PROJECT_PATH/node_modules"