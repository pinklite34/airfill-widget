'use strict';

const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./base');

const config = Object.assign({}, baseConfig, {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:' + baseConfig.port,
    './src/index'
  ],
  cache: true,
  devtool: 'eval',
  plugins: [
    new webpack.NoErrorsPlugin(),
  ]
});

module.exports = config;
