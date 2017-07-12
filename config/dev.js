'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./base');

const config = Object.assign({}, baseConfig, {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:' + baseConfig.devServer.port,
    './src/index'
  ],
  cache: true,
  devtool: 'none',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ]
});

module.exports = config;
