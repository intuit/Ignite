/* eslint-disable import/no-unresolved */

const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

module.exports = function(options) {
  return merge(baseConfig(options), {
    devServer: {
      quiet: true,
      historyApiFallback: {
        rewrites: [
          { from: /.html/, to: path.join(options.baseURL, 'index.html') }
        ]
      }
    },

    plugins: [
      new HtmlWebPackPlugin({
        base: options.baseURL,
        codeStyle: options.codeStyle,
        bulmaTheme: options.bulmaTheme,
        template: path.resolve(__dirname, './src/index.html'),
        filename: './index.html'
      })
    ]
  });
};
