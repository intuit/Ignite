#!/usr/bin/env node

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import yargs from 'yargs';

import config from '../webpack.config';

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

const webpackConfig = config(argv);
const compiler = webpack(webpackConfig);

if (argv.watch) {
  const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    stats: {
      colors: true
    }
  });
  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(8080, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:8080');
  });
} else {
  compiler.run(err => {
    if (err) {
      throw err;
    }

    console.log('Documentation packaged!');
  });
}
