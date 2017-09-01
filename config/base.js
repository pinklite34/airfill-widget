const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcPath = path.join(__dirname, '/../src');
const defaultPort = process.env.PORT || 8000;
const publicPath = '/';

module.exports = {
  devtool: 'none',
  output: {
    path: path.join(__dirname, '/../dist'),
    filename: 'widget.js',
    publicPath: publicPath
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    port: defaultPort,
    publicPath: publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {}
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, '/../src'),
          path.join(__dirname, '/../test')
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        include: [
          path.join(__dirname, '/../src'),
          path.join(__dirname, '/../test'),
          path.join(__dirname, '/../node_modules')
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader'
      },
      {
        test: /\.(mp4|ogg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg$/,
        use: ['desvg-loader/react', 'svg-loader']
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, '/../node_modules/react-phone-number-input'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-cssnext')
              ],
              sourceMap: true,
              sourceComments: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, '/../node_modules/react-toolbox'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: true,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-cssnext')({
                  features: {
                    customProperties: {
                      variables: require(path.join(__dirname, '/../src/theme'))
                    }
                  }
                })
              ],
              sourceMap: true,
              sourceComments: true
            }
          },
          'sass-loader'
        ]
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
      }
    ]
  }
};
