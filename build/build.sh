#!/usr/bin/env bash
# Bundles build/entry.js (mermaid + layer registration) into client.js.
set -euo pipefail
cd "$(dirname "$0")/.."
node_modules/.bin/esbuild build/entry.js --bundle --format=iife --minify --outfile=client.js
echo "built client.js ($(wc -c < client.js | tr -d ' ') bytes)"
