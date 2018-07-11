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
    libraryTarget: 'umd',
    chunkFilename: '[name].bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  externals: {},
});

module.exports = config;
