require('core-js/fn/object/assign');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

new WebpackDevServer(webpack(config), config.devServer)
  .listen(config.devServer.port, '0.0.0.0', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('Listening at 0.0.0.0:' + config.devServer.port);
  });
