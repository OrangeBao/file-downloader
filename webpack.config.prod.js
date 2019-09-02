const baseConfig = require("./webpack.config.base")();
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new UglifyJSPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
});