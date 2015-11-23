var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'main.jsx');
var sassPath = path.resolve(__dirname, 'app', 'main.scss');
var colorMaps = path.resolve(nodeModulesPath, 'colormap', 'colorScales.json');

var config = {
  devtool: 'eval',
  //devtool: 'eval-source-map',
  entry: ['webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080', mainPath],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {test: colorMaps, loader: 'json'},
      {test: /\.jsx$/, loader: 'babel-loader', exclude: [nodeModulesPath],query: {presets:['react']}},
      {test: /\.scss$/, loaders: ["style", "css", "sass"]}
    ]
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()],
  sassLoader: {
    includePaths: [sassPath]
  },
};

module.exports = config;
