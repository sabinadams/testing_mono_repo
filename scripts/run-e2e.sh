#!/usr/bin/env bash

DIR="$(cd "$(dirname "$0")" && pwd)"
$DIR/db-startup.sh

if [ "$#" -eq  "0" ]
  then
    npx playwright test
else
    npx playwright test --headed
fi

npx playwright show-report