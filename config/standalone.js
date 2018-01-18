'use strict';

const path = require('path');
const webpack = require('webpack');
const distConfig = require('./dist');

const config = Object.assign({}, distConfig, {
  output: {
    path: path.join(__dirname, '/../dist'),
    filename: 'widget.js',
    publicPath: '/',
    library: 'airfill-widget',
    libraryTarget: 'umd'
  },
  externals: {

  }
});

module.exports = config;
