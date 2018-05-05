#!/usr/bin/env node

import fs from 'fs';
import yargs from 'yargs';
import root from 'root-path';

import build from './ignite';

const argv = yargs
  .describe('s', 'folder to look for markdown files in')
  .default('s', 'docs/')
  .alias('s', 'src')

  .describe('i', 'root index file used as sidebar')
  .default('i', 'index.md')
  .alias('i', 'index')

  .describe('d', 'folder to write built docs to')
  .default('d', '_ignite/')
  .alias('d', 'dst')

  .describe('w', 'watch documentation files for changes')
  .alias('w', 'watch')
  .boolean('w')

  .describe('p', 'port to start docs server on')
  .default('p', 8008)
  .alias('p', 'port')
  .number('p')

  .alias('v', 'version')
  .alias('h', 'help')
  .help().argv;

const rootJson = JSON.parse(fs.readFileSync(`${root()}/package.json`));
let options = argv;

if (rootJson.ignite) {
  options = Object.assign({}, argv, rootJson.ignite);
}

build(options);
