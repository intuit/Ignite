/* eslint-disable import/no-unresolved */

const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function(options) {
  const dest = options.dst ? path.resolve(options.dst) : null;

  return {
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
      ],
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
