const { transform } = require('metro-react-native-babel-transformer');
const svgTransformer = require('react-native-svg-transformer');

module.exports.transform = function ({ src, filename, options }) {
  if (filename.endsWith('.svg')) {
    return svgTransformer.transform({ src, filename, options });
  } else {
    return transform({ src, filename, options });
  }
};
