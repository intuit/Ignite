const path = require('path');
const globby = require('globby');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MarkdownRenderer = require('marked').Renderer;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const highlightjs = require('highlight.js');

// const renderer = new MarkdownRenderer();
// renderer.code = (code, language) => {
//   const validLang = Boolean(language && highlightjs.getLanguage(language));
//   const highlighted = validLang
//     ? highlightjs.highlight(language, code).value
//     : code;
//   return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
// };

module.exports = function(options = {}) {
  const docs = globby.sync([path.join(options.src, '**/*.md')]);

  return {
    mode: 'development',

    entry: [
      ...docs.map(doc => path.resolve(doc)),
      path.resolve(__dirname, './dist/index.js')
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
            {
              loader: 'babel-loader',
              options: {
                presets: ['react']
              }
            },
            {
              loader: path.resolve(__dirname, './dist/html-to-react.js'),
              options
            },
            {
              loader: 'markdown-loader',
              options: {
                pedantic: true,
                xhtml: true
              }
            },
            {
              loader: path.resolve(__dirname, './dist/hash-link.js'),
              options
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
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
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]_[local]_[hash:base64]',
                sourceMap: true,
                minimize: true
              }
            }
          ]
        }
      ]
    },

    resolve: {
      alias: {
        ignite: path.resolve(__dirname, './dist/index.js')
      }
    },

    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.join(options.src, '**/*.{jpg,png,gif}')
        }
      ]),
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        filename: './index.html'
      })
    ]
  };
};
