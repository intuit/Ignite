#!/usr/bin/env node

import fs from 'fs';
import yargs from 'yargs';
import root from 'root-path';
import cosmiconfig from 'cosmiconfig';

import build, { defaults } from './ignite';

const { argv } = yargs
  .describe('s', 'folder to look for markdown files in')
  .default('s', defaults.src)
  .alias('s', 'src')

  .describe('d', 'folder to write built docs to')
  .default('d', defaults.dst)
  .alias('d', 'dst')

  .describe('i', 'root index file used as sidebar')
  .default('i', defaults.index)
  .alias('i', 'index')

  .describe('publish', 'publish the docs to the githubURL')

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

  .describe('plugins', 'plugins to build your docs with')
  .default('plugins', [])
  .array('plugins')

  .describe('l', 'name of the logo file in your docs folder')
  .default('l', defaults.logo)

  .describe('githubURL', 'url to github repository')

  .describe(
    'codeStyle',
    'what highlight style to use for code - see options: https://github.com/isagalaev/highlight.js/tree/master/src/styles'
  )
  .default('codeStyle', defaults.codeStyle)

  .describe('c', 'color to use for the app')
  .default('c', defaults.color)
  .alias('c', 'color')

  .describe('sc', 'color for selected routing in sidebar')
  .default('sc', defaults.selectedColor)
  .alias('sc', 'selectedColor')

  .describe('b', 'color for selected routing in sidebar')
  .default('b', defaults.bulmaTheme)
  .alias('b', 'bulmaTheme')

  .alias('v', 'version')
  .alias('h', 'help')
  .help();

const rootJson = JSON.parse(fs.readFileSync(`${root()}/package.json`));
const author = rootJson ? rootJson.author : {};
const explorer = cosmiconfig('ignite');
const igniteRc = explorer.searchSync();

let options = argv;

if (igniteRc) {
  options = Object.assign({}, argv, igniteRc.config);
}

build(options, author);
