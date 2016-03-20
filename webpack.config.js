var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var name = require('./package.json').name;

module.exports = {
  externals: {
    react: 'react',
    'react-dom': 'react-dom'
  },
  entry: './src/FittedImage.js',
  devtool: 'source-map',
  output: {
    path: './lib',
    filename: name + '.js',
    library: name,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    preLoaders: [
      {
        test: /\.js/,
        loaders: ['eslint'],
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test:   /\.js/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test:   /\.scss/,
        loader:  ExtractTextPlugin.extract('style', 'css!postcss!sass'),
        exclude: /node_modules/
      }
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new ExtractTextPlugin(name+'.css')
  ]
}
