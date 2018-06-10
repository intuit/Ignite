/* eslint-disable import/no-unresolved */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const globby = require('globby');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const IgnitePlugin = require('./dist/plugins/IgniteInjectPlugin');
const { defaults } = require('./dist/ignite');

const markdownItConfig = require('./markdownit.config');

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

    entry: [
      'intersection-observer',
      logoExists ? path.resolve(logoPath) : null,
      path.resolve(__dirname, './src/app/index.js')
    ].filter(Boolean),

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
          cache: true
        })
      ],
      // Automatically split vendor and commons
      // https://twitter.com/wSokra/status/969633336732905474
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      splitChunks: {
        chunks: 'all',
        name: 'vendors'
      }
      // Keep the runtime chunk seperated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      // runtimeChunk: true
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
        // Image
        {
          test: /\.(gif|png|jpe?g)$/i,
          use: [
            path.resolve(__dirname, './dist/loaders/image-size.js'),
            {
              loader: 'lqip-loader',
              options: {
                base64: true,
                palette: false
              }
            },
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]'
              }
            }
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
            }
          ]
        },
        // Javascript
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!.*ignite\/src)/,
          use: 'babel-loader'
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
      new CleanWebpackPlugin([dest]),
      new IgnitePlugin({
        entries: docs.map(doc => path.resolve(doc)),
        plugins: ignitePlugins,
        options
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
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
      new webpack.DefinePlugin({
        'process.env': {
          index: JSON.stringify(options.index),
          static: JSON.stringify(options.static),
          baseURL: JSON.stringify(options.baseURL),
          title: JSON.stringify(options.title),
          githubURL: JSON.stringify(options.githubURL),
          navItems: JSON.stringify(options.navItems),
          logo: JSON.stringify(logoExists ? logoPath : ''),
          plugins: JSON.stringify(options.plugins)
        }
      }),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: options.compilationSuccessInfo
      }),
      new BundleAnalyzerPlugin(),
      ...options.webpackPlugins
    ].filter(Boolean)
  };
};
