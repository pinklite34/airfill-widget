const path = require('path');

const defaultPort = process.env.PORT || 8000;
const publicPath = '/';

module.exports = {
  devtool: 'none',
  output: {
    path: path.join(__dirname, '/../dist'),
    filename: 'index.js',
    publicPath: publicPath,
    library: 'airfill-widget',
    libraryTarget: 'umd',
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    port: defaultPort,
    publicPath: publicPath,
    noInfo: false,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {},
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, '/../src'),
          path.join(__dirname, '/../test'),
        ],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader',
      },
      {
        test: /\.svg$/,
        use: ['desvg-loader/react', 'svg-loader'],
      },
    ],
  },
};
