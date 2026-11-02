const path = require('path');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            react: path.resolve(__dirname, './node_modules/react'),
            'react-native': path.resolve(__dirname, './node_modules/react-native'),
            '@react-navigation/native': path.resolve(__dirname, './node_modules/@react-navigation/native'),
            'react-native-safe-area-context': path.resolve(
              __dirname,
              './node_modules/react-native-safe-area-context',
            ),
            'react-native-screens': path.resolve(__dirname, './node_modules/react-native-screens'),
          },
        },
      ],
    ],
  };
};
