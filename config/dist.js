process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./base');
const nodeExternals = require('webpack-node-externals');

const config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  mode: 'production',
  cache: false,
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      __STANDALONE__: false,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  externals: [nodeExternals()],
});

module.exports = config;
