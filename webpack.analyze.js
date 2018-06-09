const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const config = require('./webpack.config');

module.exports = function() {
  return config({
    webpackPlugins: [new BundleAnalyzerPlugin()]
  });
};
