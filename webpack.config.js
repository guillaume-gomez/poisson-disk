const path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'build/');

module.exports = {
  entry: './js/index.js',
  output: {
    filename: 'main.bundle.js',
    path: BUILD_DIR,
  },
};
