#!/usr/bin/env node

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import ghpages from 'gh-pages';

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

export default function build(options, user) {
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
        console.log(err);
        return;
      }

      console.log('Documentation built!');

      if (options.publish) {
        if (!options.githubURL) {
          console.log('Need to provide githubURL option to publish');
          return;
        }

        if (!user.name) {
          console.log('Need author.name in package.json to publish');
          return;
        }

        if (!user.email) {
          console.log('Need author.email in package.json to publish');
          return;
        }

        if (options.githubURL.includes('http')) {
          options.githubURL = options.githubURL.split('//')[1];
        }

        ghpages.publish(
          options.dst,
          {
            message: ':memo: Update Documentation',
            repo: `https://username:${process.env.GITHUB_KEY}@${
              options.githubURL
            }`,
            user
          },
          err => {
            if (err) {
              console.log(err);
              return;
            }

            console.log('Documentation publish to github-pages!');
          }
        );
      }
    });
  }
}
