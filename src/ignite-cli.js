#!/usr/bin/env node

import fs from 'fs';
import yargs from 'yargs';
import root from 'root-path';

import build, { defaults } from './ignite';

const argv = yargs
  .describe('s', 'folder to look for markdown files in')
  .default('s', defaults.src)
  .alias('s', 'src')

  .describe('i', 'root index file used as sidebar')
  .default('i', defaults.index)
  .alias('i', 'index')

  .describe('d', 'folder to write built docs to')
  .default('d', defaults.dst)
  .alias('d', 'dst')

  .describe('w', 'watch documentation files for changes')
  .alias('w', 'watch')
  .boolean('w')

  .describe('p', 'port to start docs server on')
  .default('p', defaults.port)
  .alias('p', 'port')
  .number('p')

  .describe('t', 'the title to put in the header of the docs')
  .default('t', defaults.title)
  .alias('t', 'title')

  .describe('gh', 'url to github repository')
  .alias('gh', 'githubURL')

  .describe(
    'cs',
    'what highlight style to use for code - see options: https://github.com/isagalaev/highlight.js/tree/master/src/styles'
  )
  .alias('cs', 'codeStyle')

  .alias('v', 'version')
  .alias('h', 'help')
  .help().argv;

const rootJson = JSON.parse(fs.readFileSync(`${root()}/package.json`));
let options = argv;

if (rootJson.ignite) {
  options = Object.assign({}, argv, rootJson.ignite);
}

build(options);
