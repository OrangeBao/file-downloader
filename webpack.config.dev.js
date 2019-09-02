const baseConfig = require("./webpack.config.base")();
const merge = require('webpack-merge');

const config = merge(baseConfig, {
  devServer: {
    contentBase: './public'
  }
});
module.exports = config;