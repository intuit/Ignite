#!/usr/bin/env node

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from '../webpack.config';

export default function build(argv) {
  const webpackConfig = config(argv);
  const compiler = webpack(webpackConfig);

  if (argv.watch) {
    const devServerOptions = Object.assign({}, webpackConfig.devServer, {
      stats: {
        colors: true
      }
    });
    const server = new WebpackDevServer(compiler, devServerOptions);
    const port = argv.port || 8080;

    server.listen(argv.port || 8080, '127.0.0.1', () => {
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
