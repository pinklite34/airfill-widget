const path = require('path');

const defaultPort = process.env.PORT || 8000;
const publicPath = '/';

module.exports = {
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/../dist'),
    filename: 'index.js',
    publicPath: publicPath,
    library: 'airfill-widget',
    libraryTarget: 'umd',
    chunkFilename: '[name].bundle.js',
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    port: defaultPort,
    publicPath: publicPath,
    noInfo: false,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.tsx', '.ts'],
    alias: {},
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, '/../src'),
          // path.join(__dirname, '/../test'),
        ],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader',
      },
      {
        test: /\.svg$/,
        loader: 'svg-react-loader',
      },
    ],
  },
};
