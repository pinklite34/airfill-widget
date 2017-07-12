const path = require('path');

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
    alias: {
    }
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
          path.join(__dirname, '/../node_modules'),
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader'
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      }
    ]
  }
};
