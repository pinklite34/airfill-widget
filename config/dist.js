'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./base');

const config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  }
});

module.exports = config;
