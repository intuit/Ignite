#!/usr/bin/env sh

export PATH=$PATH:`npm bin`

echo 'CI build - Publishing'
npm version `github-version` -m '%s [skip ci]'

PACKAGE_VERSION=$(cat package.json \
| grep version \
| head -1 \
| awk -F: '{ print $2 }' \
| sed 's/[",]//g')

echo 'CI build - Generating CHANGELOG'
echo "\n$PACKAGE_VERSION\n" >> CHANGELOG.md
github-release -d >> CHANGELOG.md
git add CHANGELOG.md
git commit -m 'Adding CHANGELOG.md [skip ci]'

npm publish
git push --follow-tags --set-upstream origin $branch
./github-release
