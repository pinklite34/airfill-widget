process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require('webpack');
const baseConfig = require('./base');

baseConfig.output.filename = 'widget.js';

const config = Object.assign({}, baseConfig, {
  entry: [require.resolve('./polyfills'), require.resolve('../src/index')],
  mode: 'development',
  cache: true,
  devtool: 'cheap-module-source-map',
  plugins: [new webpack.NoEmitOnErrorsPlugin()],
});

module.exports = config;
