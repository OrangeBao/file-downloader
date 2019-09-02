const path = require('path');

module.exports = (env) => {
  return {
    entry: './index.js',
    output: {
      filename: 'file-downloader.js',
      path: path.resolve(__dirname, 'public'),
      library: 'downLoaderByUrl',
      libraryExport: 'default',
      libraryTarget: 'umd'
    },
    devtool: 'source-map',
  }
};