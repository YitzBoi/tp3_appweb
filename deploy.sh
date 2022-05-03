#!/usr/bin/env sh

set -e

pnpm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:YitzBoi/tp3_appweb.git master:tp3_pages

cd -