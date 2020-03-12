#!/bin/bash

set -e

"node_modules/.bin/tsc" --noEmit --watch
#"node_modules/.bin/parcel" ./dist/index.html