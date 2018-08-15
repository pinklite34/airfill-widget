process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const baseConfig = require('./base');
const env = require('./env');

const config = Object.assign({}, baseConfig, {
  entry: [require.resolve('./polyfills'), require.resolve('../src/index.tsx')],
  mode: 'production',
  cache: false,
  optimization: {
    minimize: true,
  },
  plugins: baseConfig.plugins.concat([
    new webpack.DefinePlugin(Object.assign({}, env.stringified, {
      'process.env.NODE_ENV': '"production"',
    })),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]),
  externals: [nodeExternals()],
});

module.exports = config;
