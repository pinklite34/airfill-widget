'use strict';

const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const distConfig = require('./dist');

const config = Object.assign({}, distConfig, {
  output: {
    path: path.join(__dirname, '/../dist'),
    filename: 'widget.js',
    publicPath: '/',
    library: 'airfill-widget',
    libraryTarget: 'umd',
    chunkFilename: '[name].bundle.js',
  },
  externals: {},
});

module.exports = config;
