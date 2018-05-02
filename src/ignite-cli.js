#!/usr/bin/env node

import yargs from 'yargs';
import build from './ignite';
import watch from './watch';

const argv = yargs
  .default('src', 'docs/**/*.md')
  .alias('s', 'src')
  .describe('i', 'root index file used as sidebar')
  .default('i', 'index.md')
  .alias('i', 'index')
  .default('dst', '_ignite/')
  .alias('d', 'dst')
  .boolean('watch')
  .alias('w', 'watch')
  .describe('w', 'watch documentation files for changes')
  .default('port', 8008)
  .number('port')
  .alias('p', 'port')
  .alias('v', 'version')
  .alias('h', 'help')
  .help().argv;

build(argv);

if (argv.watch) {
  watch(argv);
}
