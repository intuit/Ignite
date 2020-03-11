const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = function(options) {
  return {
    devServer: {
      quiet: true,
      historyApiFallback: {
        rewrites: [
          { from: /.html/, to: path.join(options.baseURL, 'index.html') }
        ]
      }
    },

    module: {
      rules: [
        // Images
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: 'file-loader'
        },
        // CSS
        {
          test: /\.css$/,
          oneOf: [
            {
              resource: /\.plugin\.css$/,
              use: [
                'style-loader',
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
                'style-loader',
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
            },
          ]
        }
      ]
    },

    plugins: [
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
          : undefined
      })
    ]
  };
};
