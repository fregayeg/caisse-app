/********************Imports*************************/

import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

/********************Constants*************************/

const port = 3000; // the port which are we going to use
const app = express(); // instantiate new express object
const compiler = webpack(config); // we get webpack with the configuration that we ve prepared

/********************Express configuration*************************/

// start configuring express
// we use webpack-dev-middleware (check for documentation) and pass it our compiler which
// represents our webpack configuration
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true, // we dnt need information on cmd
  publicPath: config.output.publicPath // we pass it the public path which we defined in webpack config
}));

// we specify to use webpack-hot-middleware (check documentation) we pass it the webpack config
app.use(require('webpack-hot-middleware')(compiler));

// any request will return to index.html
app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

// listen to port 3000, and open the browser to localhost:3000 when we tap npm start!
app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
