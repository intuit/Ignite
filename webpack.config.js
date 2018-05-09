/* eslint-disable import/no-unresolved */

const path = require('path');
const webpack = require('webpack');
const globby = require('globby');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const highlightjs = require('highlight.js');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const LazyLoadPlugin = require('./dist/plugins/lazy-load');

const makePlugin = require('./dist/extensions/ignite-plugin').default;

module.exports = function(options = {}) {
  const docs = globby.sync([path.join(options.src, '**/*.md')]);
  const logoPath = path.join(options.src, options.logo);

  return {
    mode: options.mode,

    entry: [
      path.resolve(logoPath),
      path.resolve(__dirname, './src/app/index.js'),
      path.resolve('./src/extensions/testExtension') // First resolve the component
    ],

    devtool: 'source-map',

    output: {
      path: options.dst ? path.resolve(options.dst) : null,
      filename: 'bundle.js'
    },

    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            'babel-loader',
            {
              loader: path.resolve(
                __dirname,
                './dist/loaders/html-to-react.js'
              ),
              options
            },
            {
              loader: path.resolve(__dirname, './dist/loaders/markdown-it.js'),
              options: {
                xhtmlOut: true,
                plugins: [
                  [
                    'markdown-it-checkbox',
                    {
                      divWrap: true
                    }
                  ],
                  'markdown-it-br',
                  'markdown-it-sub',
                  'markdown-it-mark',
                  'markdown-it-ins',
                  'markdown-it-sup',
                  'markdown-it-anchor',
                  'markdown-it-emoji',
                  require('./dist/extensions/font-awesome'),
                  require('./dist/extensions/bulma-tag'),
                  require('./dist/extensions/bulma-progress'),
                  require('./dist/extensions/bulma-hero'),
                  require('./dist/extensions/bulma-message'),
                  require('./dist/extensions/bulma-box'),
                  require('./dist/extensions/bulma-row'),
                  require('./dist/extensions/bulma-tile'),

                  makePlugin('test'), // then register the name
                  ...options.plugins
                ],
                highlight: (code, language) => {
                  const validLang = Boolean(
                    language && highlightjs.getLanguage(language)
                  );
                  const highlighted = validLang
                    ? highlightjs.highlight(language, code).value
                    : code;
                  return `${highlighted}`;
                }
              }
            },
            {
              loader: path.resolve(__dirname, './dist/loaders/hash-link.js'),
              options
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!.*ignite\/src)|extensions/,
          use: 'babel-loader'
        },
        {
          test: /\.js$/,
          include: /extensions/,
          use: [
            'babel-loader',
            path.resolve(__dirname, './dist/loaders/load-plugin.js')
          ]
        },
        // Might not be needed
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]'
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]_[local]_[hash:base64]',
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
      new LazyLoadPlugin({
        entries: docs.map(doc => path.resolve(doc))
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new CopyWebpackPlugin([
        {
          from: path.join(options.src, '**/*.{jpg,png,gif}')
        }
      ]),
      new HtmlWebPackPlugin({
        codeStyle: options.codeStyle,
        bulmaTheme: options.bulmaTheme,
        template: path.resolve(__dirname, './src/index.html'),
        filename: './index.html'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          title: JSON.stringify(options.title),
          githubURL: JSON.stringify(options.githubURL),
          logo: JSON.stringify(logoPath)
        }
      }),
      new FriendlyErrorsWebpackPlugin({
        clearConsole: options.mode === 'development',
        compilationSuccessInfo: options.compilationSuccessInfo
      })
    ]
  };
};
