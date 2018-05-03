const path = require('path');
const globby = require('globby');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MarkdownRenderer = require('marked').Renderer;
const highlightjs = require('highlight.js');

const renderer = new MarkdownRenderer();
renderer.code = (code, language) => {
  const validLang = Boolean(language && highlightjs.getLanguage(language));
  const highlighted = validLang
    ? highlightjs.highlight(language, code).value
    : code;
  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
};

module.exports = function(options = {}) {
  const docs = globby.sync([path.join(options.src, '**/*.md')]);

  return {
    mode: 'development',
    entry: [...docs.map(doc => path.resolve(doc)), './src/index.js'],

    output: {
      path: options.dst ? path.resolve(options.dst) : null,
      filename: 'bundle.js'
    },

    // devServer: {
    //   contentBase: path.join(__dirname, 'dist')
    // },

    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            {
              loader: 'babel-loader'
            },
            {
              loader: path.resolve('./dist/markdown-to-react.js'),
              options: {
                src: options.src
              }
            },
            // Create loader to Render parsed markdown html as React Component and change above html-loader to babel-loader
            // Create loader to transform .md links to .html
            {
              loader: 'markdown-loader',
              options: {
                pedantic: true,
                xhtml: true,
                renderer
              }
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

    plugins: [
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
      })
    ]
  };
};
