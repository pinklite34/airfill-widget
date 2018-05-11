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
      __STANDALONE__: true,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  externals: {},
});

module.exports = config;
