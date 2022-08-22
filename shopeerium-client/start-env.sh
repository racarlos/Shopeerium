#!/bin/sh -e

echo "Starting Angular"
node node_modules/.bin/ng serve --host 0.0.0.0 --port 80 --configuration production --disable-host-check true
