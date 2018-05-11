process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require('webpack');
const baseConfig = require('./base');

baseConfig.output.filename = 'widget.js';

const config = Object.assign({}, baseConfig, {
  entry: './src/index',
  mode: 'development',
  cache: true,
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      __STANDALONE__: false,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});

module.exports = config;
