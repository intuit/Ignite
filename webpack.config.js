/* eslint-disable import/no-unresolved */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const globby = require('globby');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const IgnitePlugin = require('./dist/plugins/IgniteInjectPlugin');

const markdownItConfig = require('./markdownit.config');

module.exports = function(options = {}) {
  const { ignitePlugins } = markdownItConfig.splitPlugins(options.plugins);

  const docs = globby.sync([path.join(options.src, '**/*.md')]);
  const logoPath = options.logo ? path.join(options.src, options.logo) : null;
  const logoExists = fs.existsSync(path.resolve(logoPath));
  const dest = options.dst ? path.resolve(options.dst) : null;

  return {
    mode: options.mode,

    entry: [
      logoExists ? path.resolve(logoPath) : null,
      path.resolve(__dirname, './src/app/index.js')
    ].filter(Boolean),

    devtool: 'source-map',

    devServer: {
      historyApiFallback: {
        rewrites: [{ from: /./, to: path.join(options.dst, 'index.html') }]
      }
    },

    output: {
      path: dest,
      filename: 'bundle.js',
      publicPath: options.baseURL
    },

    module: {
      rules: [
        // Markdown
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
          use: 'babel-loader'
        },
        // Images - Might not be needed
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
      !options.watch && new CleanWebpackPlugin([dest]),
      new IgnitePlugin({
        entries: docs.map(doc => path.resolve(doc)),
        plugins: ignitePlugins,
        options
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
        base: options.baseURL,
        codeStyle: options.codeStyle,
        bulmaTheme: options.bulmaTheme,
        template: path.resolve(__dirname, './src/index.html'),
        filename: './index.html'
      }),
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, './src/404.html'),
        filename: './404.html'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          index: JSON.stringify(options.index),
          static: JSON.stringify(options.watch ? false : options.static),
          baseURL: JSON.stringify(options.baseURL),
          title: JSON.stringify(options.title),
          githubURL: JSON.stringify(options.githubURL),
          navItems: JSON.stringify(options.navItems),
          logo: JSON.stringify(logoExists ? logoPath : ''),
          plugins: JSON.stringify(options.plugins)
        }
      }),
      new FriendlyErrorsWebpackPlugin({
        clearConsole: options.mode === 'development',
        compilationSuccessInfo: options.compilationSuccessInfo
      })
    ].filter(Boolean)
  };
};
