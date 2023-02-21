#!/usr/bin/env bash

DIR="$(cd "$(dirname "$0")" && pwd)"
$DIR/db-startup.sh

if [ "$#" -eq  "0" ]
  then
    vitest -c ./vitest.config.integration.ts
else
    vitest -c ./vitest.config.integration.ts --ui
fi