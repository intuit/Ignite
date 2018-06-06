#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import git from 'simple-git/promise';
import dayjs from 'dayjs';
import globby from 'globby';
import register from 'babel-register';
import root from 'root-path';
import cosmiconfig from 'cosmiconfig';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import ghpages from 'gh-pages';
import createStaticWebsite from 'react-snap';

import config from '../webpack.config';
import packageJSON from '../package';

register(packageJSON.babel || {});

export async function initPlugins(options) {
  options.plugins.forEach(async plugin => {
    let [, pluginPath, pluginOptions] = plugin;
    const initFile = path.join(pluginPath, 'init.js');

    if (!pluginOptions) {
      pluginOptions = {};
      plugin[2] = pluginOptions;
    }

    if (fs.existsSync(initFile)) {
      try {
        pluginOptions._initData = await require(path.resolve(initFile))(
          pluginOptions
        );
      } catch (err) {
        console.error(err, '');
      }
    }
  });

  return options;
}

export async function blogPosts(options) {
  let blogPosts = await globby([path.join(options.src, 'blog/**/*.md')]);

  if (blogPosts.length === 0) {
    return null;
  }

  blogPosts = await Promise.all(
    blogPosts
      .map(blogFile => path.relative(options.src, blogFile))
      .map(async blogFile => {
        const docLog = await git().log({ file: 'docs/' + blogFile });
        const birth = docLog.all[docLog.all.length - 1].date;

        return {
          path: blogFile,
          birth: Number(dayjs(birth))
        };
      })
  );

  return blogPosts;
}

export function getAuthor() {
  const rootJson = JSON.parse(fs.readFileSync(`${root()}/package.json`));
  const author = rootJson ? rootJson.author : {};

  return author;
}

export const defaults = {
  mode: 'production',
  static: false,
  src: 'docs/',
  dst: '_ignite/',
  index: 'index.md',
  port: 8008,
  title: 'Documentation',
  codeStyle: 'foundation',
  color: 'auto',
  selectedColor: 'auto',
  logo: 'logo.svg',
  bulmaTheme: 'default'
};

function initOptions(options) {
  const explorer = cosmiconfig('ignite');
  const igniteRc = explorer.searchSync();

  if (igniteRc) {
    options = Object.assign({}, options, igniteRc.config);
  }

  return Object.assign({}, defaults, options);
}

function initBuildMessages(options) {
  if (options.watch) {
    options = Object.assign({}, options, {
      mode: 'development',
      compilationSuccessInfo: {
        messages: [
          `You documentation is running here http://localhost:${options.port}`
        ]
      }
    });
  } else {
    options = Object.assign({}, options, {
      compilationSuccessInfo: {
        messages: ['Documentation built!'],
        notes: [
          `Bundled documentation stored in '${options.dst}'.`,
          'Run `ignite --publish` to publish documentation to github-pages.'
        ]
      }
    });
  }

  return options;
}

function publish(options, user) {
  if (options.githubURL.includes('http')) {
    [, options.githubURL] = options.githubURL.split('//');
  }

  ghpages.publish(
    options.dst,
    {
      message: ':memo: Update Documentation',
      repo: `https://username:${process.env.GITHUB_KEY}@${options.githubURL}`,
      user
    },
    err => {
      if (err) {
        console.error(err);
        return;
      }

      console.warn('Documentation published to github-pages!');
    }
  );
}

export default async function build(options) {
  const user = getAuthor();

  options = initOptions(options);
  options = initBuildMessages(options);
  options.blogPosts = await blogPosts(options);

  if (options.plugins) {
    options = await initPlugins(options);
  }

  const webpackConfig = config(options);
  const compiler = webpack(webpackConfig);

  if (options.publish) {
    if (!options.githubURL) {
      console.error('Need to provide githubURL option to publish');
      return;
    }

    if (!user.name) {
      console.error('Need author.name in package.json to publish');
      return;
    }

    if (!user.email) {
      console.error('Need author.email in package.json to publish');
      return;
    }
  }

  if (options.watch) {
    const devServerOptions = Object.assign({}, webpackConfig.devServer, {
      quiet: true
    });
    const server = new WebpackDevServer(compiler, devServerOptions);

    server.listen(options.port, '127.0.0.1', () => {
      console.warn(`Starting server on http://localhost:${options.port}`);
    });
  } else {
    compiler.run(async (err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.details) {
          console.error(err.details);
        }
        return;
      }

      stats.hasWarnings();

      if (stats.hasErrors()) {
        return;
      }

      if (options.static) {
        await createStaticWebsite.run({
          source: options.dst
        });
      }

      if (options.publish) {
        publish(options, user);
      }
    });
  }
}
