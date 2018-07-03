/* eslint-disable import/no-unresolved */

const path = require('path');
const webpack = require('webpack');

const WebpackCdnPlugin = require('webpack-cdn-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

module.exports = function(options) {
  process.env.BABEL_ENV = 'production';

  const dest = options.dst ? path.resolve(options.dst) : null;

  return merge(baseConfig(options), {
    profile: options.json,

    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            parse: {
              // We want uglify-js to parse ecma 8 code. However, we don't want it
              // to apply any minfication steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false
            },
            minify: {
              toplevel: true
            },
            mangle: {
              safari10: true
            },
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              // eslint-disable-next-line camelcase
              ascii_only: true
            }
          },
          // Use multi-process parallel running to improve the build speed
          // Default number of concurrent runs: os.cpus().length - 1
          parallel: true,
          // Enable file caching
          cache: true,
          sourceMap: true
        })
      ]
    },

    plugins: [
      new webpack.PrefetchPlugin('', 'react-ideal-image'),
      new webpack.PrefetchPlugin('', 'react-color'),
      new webpack.PrefetchPlugin('', 'react-waypoint'),
      new CleanWebpackPlugin([dest]),
      new HtmlWebPackPlugin({
        base: options.baseURL,
        codeStyle: options.codeStyle,
        bulmaTheme: options.bulmaTheme,
        template: path.resolve(__dirname, './src/index.html'),
        filename: './index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }),
      new HtmlWebPackPlugin({
        baseURL: options.baseURL,
        template: path.resolve(__dirname, './src/404.html'),
        filename: './404.html'
      }),
      options.static &&
        new CopyWebpackPlugin([
          {
            from: path.join(options.src, '**/*.{jpg,png,gif}')
          }
        ]),
      new WebpackCdnPlugin({
        modules: {
          react: [
            {
              name: 'react',
              var: 'React',
              path: `umd/react.${options.mode}.min.js`
            },
            {
              name: 'react-dom',
              var: 'ReactDOM',
              path: `umd/react-dom.${options.mode}.min.js`
            }
          ]
        },
        publicPath: options.baseURL
      }),
      options.analyze && new BundleAnalyzerPlugin()
    ].filter(Boolean)
  });
};
