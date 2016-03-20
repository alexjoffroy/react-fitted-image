var babelJest = require('babel-jest');

module.exports = {
  // As we can require .css or others extensions in our library, Jest has to only check .js files
  process: function(src, filename) {
    if (filename.match(/\.js?$/)) {
      return babelJest.process(src, filename);
    } else {
      return '';
    }
  }
};
