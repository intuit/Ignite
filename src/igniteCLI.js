#!/usr/bin/env node

import yargs from 'yargs';
import build from './index';

const argv = yargs
  .default('src', 'docs/')
  .default('dst', '_ignite/')
  .command('get', 'make a get HTTP request', {
    url: {
      alias: 'u',
      default: 'http://yargs.js.org/'
    }
  })
  .help()
  .argv

console.log(argv)
build(argv);
