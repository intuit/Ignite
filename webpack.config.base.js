/* eslint-disable import/no-unresolved */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const globby = require('globby');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const IgnitePlugin = require('./dist/plugins/IgniteInjectPlugin');
const { defaults } = require('./dist/ignite');
const babelRc = require('./.babelrc');
const markdownItConfig = require('./markdownit.config');

const babelConfig = options =>
  babelRc({
    env() {
      return options.mode;
    }
  });

module.exports = function(options) {
  options = {
    ...defaults,
    ...options
  };

  const { ignitePlugins } = markdownItConfig.splitPlugins(options.plugins);

  const docs = globby.sync([path.join(options.src, '**/*.md')]);
  const logoPath = options.logo ? path.join(options.src, options.logo) : null;
  const logoExists = logoPath && fs.existsSync(path.resolve(logoPath));
  const dest = options.dst ? path.resolve(options.dst) : null;

  return {
    mode: options.mode,
    devtool: 'source-map',

    entry: [
      logoExists ? path.resolve(logoPath) : null,
      path.resolve(__dirname, './src/app/index.js')
    ].filter(Boolean),

    optimization: {
      // Automatically split vendor and commons
      // https://twitter.com/wSokra/status/969633336732905474
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      splitChunks: {
        chunks: 'all'
      }
    },

    output: {
      path: dest,
      publicPath: options.baseURL
    },

    module: {
      rules: [
        // Markdown
        {
          test: /\.md$/,
          use: [
            {
              loader: 'babel-loader',
              options: babelConfig(options)
            },
            {
              loader: path.resolve(
                __dirname,
                './dist/loaders/html-to-react.js'
              ),
              options
            },
            {
              loader: 'markdown-it-vanilla-loader',
              options: markdownItConfig.generateConfig(options.plugins)
            },
            {
              loader: path.resolve(__dirname, './dist/loaders/hash-link.js'),
              options
            }
          ]
        },
        // Javascript
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!.*ignite\/src)/,
          use: {
            loader: 'babel-loader',
            options: babelConfig(options)
          }
        },
        // Images
        {
          test: /\.(gif|png|jpe?g)$/i,
          use: [
            {
              loader: 'lqip-loader',
              options: {
                base64: true,
                palette: false
              }
            },
            {
              loader: 'responsive-loader',
              options: {
                sizes: [300, 600, 900, 1200],
                name: '[path][name]-[width].[ext]'
              }
            },
            'image-webpack-loader'
          ]
        },
        {
          test: /\.(svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]'
              }
            },
            'image-webpack-loader'
          ]
        },
        // CSS
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName:
                  options.mode === 'production'
                    ? '[sha1:hash:hex:4]'
                    : '[name]_[local]_[sha1:hash:hex:4]',
                sourceMap: true,
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => [
                  require('postcss-pseudoelements'),
                  require('postcss-color-rgba-fallback'),
                  require('postcss-initial'),
                  require('postcss-nested'),
                  require('autoprefixer'),
                  require('postcss-simple-vars')({
                    variables: {
                      APP_COLOR: options.color,
                      SELECTED_COLOR: options.selectedColor
                    }
                  })
                ]
              }
            }
          ]
        }
      ]
    },

    resolve: {
      alias: {
        ignite: path.resolve(__dirname, './src/app/index.js')
      }
    },

    plugins: [
      new IgnitePlugin({
        entries: docs.map(doc => path.resolve(doc)),
        plugins: ignitePlugins,
        options
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          SEARCH: JSON.stringify(options.searchIndex),
          index: JSON.stringify(options.index),
          baseURL: JSON.stringify(options.baseURL),
          title: JSON.stringify(options.title),
          githubURL: JSON.stringify(options.githubURL),
          navItems: JSON.stringify(options.navItems),
          logo: JSON.stringify(logoExists ? logoPath : ''),
          plugins: JSON.stringify(options.plugins)
        }
      }),
      options.log &&
        new FriendlyErrorsWebpackPlugin({
          clearConsole: options.mode !== 'production',
          compilationSuccessInfo: options.compilationSuccessInfo
        }),
      ...options.webpackPlugins
    ].filter(Boolean)
  };
};
