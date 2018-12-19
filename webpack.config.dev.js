// 2 things are necessary here webpack and path
import webpack from 'webpack';
import path from 'path';

// the way that webpack is configured is by defining an object literal, this object starts from line 6 and finished at line 38
export default {
  debug: true, // enables displaying debugging information
  devtool: 'inline-source-map', // a style of source mapping check 'devtool webpack' documentation
  noInfo: false, // webpack will display the list of all files that is bundling
  entry: [ // the entry points
    'eventsource-polyfill', // necessary for hot reloading with Internet explorer
    'webpack-hot-middleware/client?reload=true', // note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'src/index') // note that we are specifying the index.js file that we've created in src
  ],
  target: 'web', // targeting the web, means that webpack understand that it should bundle the files into a file then into the browser
  output: { // webpack will ask for the file which is going to receive all of the js files
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: { // we need to tell webpack-devserver where our code is (in src folder)
    contentBase: path.resolve(__dirname, 'src')
  },
  plugins: [ // we add some plugins to enhance webpack power
    new webpack.HotModuleReplacementPlugin(), // enable to replace module without refreshing the browser
    new webpack.NoErrorsPlugin() // keep errors on browsers without breaking our reloading experience
  ],
  module: { // this section tells webpack what file types it should handle
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},// js files in src folder using babel
      {test: /(\.css)$/, loaders: ['style', 'css']}, // the rest are css & bootstrap files..
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'}, // check documentations
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},// check documentations
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},// check documentations
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}// check documentations
    ]
  }
};
