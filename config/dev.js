process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require('webpack');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const WebpackBar = require('webpackbar');

const baseConfig = require('./base');

baseConfig.output.filename = 'widget.js';

const config = Object.assign({}, baseConfig, {
  entry: [require.resolve('./polyfills'), require.resolve('../src/index.tsx')],
  mode: 'development',
  cache: true,
  devtool: 'cheap-module-source-map',
  plugins: baseConfig.plugins.concat([
    new webpack.NoEmitOnErrorsPlugin(),
    new WebpackBar(),
    new UnusedFilesWebpackPlugin({
      patterns: ['src/**/*.*'],
      globOptions: {
        ignore: [
          'src/lib/test-helpers.ts',
          'src/**/*.test.ts',
          'src/index.html',
          'src/translations/**/*.*',
        ],
      },
    }),
  ]),
});

module.exports = config;
