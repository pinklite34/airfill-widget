process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require('webpack');
const baseConfig = require('./base');

baseConfig.output.filename = 'widget.js';

const config = Object.assign({}, baseConfig, {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:' + baseConfig.devServer.port,
    './src/index',
  ],
  cache: true,
  devtool: 'cheap-module-source-map',
  plugins: [new webpack.NoEmitOnErrorsPlugin()],
});

module.exports = config;
