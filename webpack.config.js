const path = require('path');

module.exports = {
  entry: './client/index.js',

  mode: 'development',

  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js'
  },

  // Creates "source map" files (ex. "bundle.js.map"). Modern browsers can automatically
  // request these to "rebuild" your original source code in your dev tools (i.e. the Sources tab).
  // This makes debugging much, much nicer
  devtool: 'source-map'
};
