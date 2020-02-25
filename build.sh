#!/bin/bash
set -e
set -o pipefail

howToUse()
{
  echo "Script responsible for Building and Testing"
  echo ""
  echo "Testing usage: ./build.sh test"
  echo ""
  echo "Building usage: ./build.sh deploy <env>"
  echo "Envs that can be used: prod, staging, dev"
  echo ""
  echo "Example:"
  echo "- Deploying to dev: ./build.sh deploy dev"
}

if [ $# = 0 ]; then
  howToUse
  exit 1
elif [ "$1" = "test" ]; then
  echo "- Install dependencies"
  HUSKY_SKIP_INSTALL=1 npm i

  echo ""
  echo "- Setup post install links, scripts, etc"
  npm run postinstall

  echo ""
  echo "- Testing"
  npm test
elif [ "$1" = "deploy" ] && [ $# = 2 ]; then
  STAGE=$2
  echo "- Install dependencies"
  HUSKY_SKIP_INSTALL=1 npm i

  echo ""
  echo "- Setup post install links, scripts, etc"
  npm run postinstall

  echo ""
  echo "- Deploying"
  'node_modules/.bin/sls' deploy -s $STAGE
else
  howToUse
  exit 1
fi

