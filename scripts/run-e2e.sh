#!/usr/bin/env bash

DIR="$(cd "$(dirname "$0")" && pwd)"
source $DIR/setenv.sh
$DIR/db-startup.sh

if [ "$#" -eq  "0" ]
  then
    npx playwright test
else
    npx playwright test --headed
fi

npx playwright show-report