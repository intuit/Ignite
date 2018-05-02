#!/usr/bin/env node

import yargs from 'yargs';
import build from './ignite';
import watch from './watch';

const argv = yargs
  .default('src', 'docs/')
  .alias('s', 'src')
  .default('dst', '_ignite/')
  .alias('d', 'dst')
  .boolean('watch')
  .alias('w', 'watch')
  .describe('w', 'watch documentation files for changes')
  .alias('v', 'version')
  .alias('h', 'help')
  .help().argv;

build(argv);

if (argv.watch) {
  watch(argv);
}
