/* eslint-disable import/no-unresolved */

const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function(options) {
  const dest = options.dst ? path.resolve(options.dst) : null;

  return {
    profile: options.json,

    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },

    module: {
      rules: [
        // Images
        {
          test: /\.(png|jpe?g)$/i,
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
          test: /\.(gif)$/i,
          use: ['file-loader', 'image-webpack-loader']
        },
        {
          test: new RegExp(`.(svg)$|${options.logo}`, 'i'),
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
          oneOf: [
            {
              resource: /\.plugin\.css$/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-nested'),
                      require('autoprefixer'),
                      require('postcss-simple-vars')({
                        variables: {
                          APP_COLOR: options.color,
                          SELECTED_COLOR: options.selectedColor
                        }
                      }),
                      require('cssnano')
                    ]
                  }
                }
              ]
            },
            {
              resource: /\.css$/,
              use: [
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[sha1:hash:hex:4]',
                    sourceMap: true
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-nested'),
                      require('autoprefixer'),
                      require('postcss-simple-vars')({
                        variables: {
                          APP_COLOR: options.color,
                          SELECTED_COLOR: options.selectedColor
                        }
                      }),
                      require('cssnano')
                    ]
                  }
                }
              ]
            }
          ]
        }
      ]
    },

    plugins: [
      new CleanWebpackPlugin([dest]),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      new HtmlWebPackPlugin({
        base: options.baseURL,
        codeStyle: options.codeStyle,
        bulmaTheme: options.bulmaTheme,
        template: path.resolve(__dirname, '../src/index.html'),
        filename: './index.html',
        customHead: options.customHead,
        faviconType: options.faviconType,
        favicon: options.favicon
          ? path.join(options.src, options.favicon)
          : undefined,
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
        template: path.resolve(__dirname, '../src/404.html'),
        filename: './404.html'
      }),
      new webpack.PrefetchPlugin('', 'react-ideal-image'),
      new webpack.PrefetchPlugin('', 'react-color'),
      new webpack.PrefetchPlugin('', 'react-waypoint'),
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
  };
};
