#!/usr/bin/env node

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from '../webpack.config';

export const defaults = {
  mode: 'production',
  src: 'docs/',
  dst: '_ignite/',
  index: 'index.md',
  port: 8008,
  title: 'Documentation',
  codeStyle: 'foundation',
  color: '#f44336'
};

export default function build(options) {
  options = Object.assign({}, defaults, options);

  if (options.watch) {
    options = Object.assign(options, {
      mode: 'development'
    });
  }

  const webpackConfig = config(options);
  const compiler = webpack(webpackConfig);

  if (options.watch) {
    const devServerOptions = Object.assign({}, webpackConfig.devServer, {
      stats: {
        colors: true
      }
    });
    const server = new WebpackDevServer(compiler, devServerOptions);
    const port = options.port || 8080;

    server.listen(port, '127.0.0.1', () => {
      console.log(`Starting server on http://localhost:${port}`);
    });
  } else {
    compiler.run(err => {
      if (err) {
        throw err;
      }

      console.log('Documentation packaged!');
    });
  }
}
