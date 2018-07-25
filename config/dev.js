process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require('webpack');
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');

const baseConfig = require('./base');

baseConfig.output.filename = 'widget.js';

const config = Object.assign({}, baseConfig, {
  entry: [require.resolve('./polyfills'), require.resolve('../src/index')],
  mode: 'development',
  cache: true,
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new UnusedFilesWebpackPlugin({
      patterns: ['src/**/*.*'],
      globOptions: {
        ignore: [
          'src/lib/test-helpers.js',
          'src/**/*.test.js',
          'src/index.html',
        ],
      },
    }),
  ],
});

module.exports = config;
