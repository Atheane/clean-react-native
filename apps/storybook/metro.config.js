const { withNxMetro } = require('@nx/expo');
const { getDefaultConfig } = require('@expo/metro-config');
const { mergeConfig } = require('metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const path = require('path');
const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;
const { generate } = require('@storybook/react-native/scripts/generate');

generate({
  configPath: path.resolve(__dirname, './src/.storybook'),
});

const customConfig = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    unstable_allowRequireContext: true,
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg', 'mjs'],
    blockList: exclusionList([/^(?!.*node_modules).*\/dist\/.*/]),
    unstable_enableSymlinks: true,
    alias: {
      ...defaultConfig.resolver.alias,
      '@clean-rn/ui-mobile': path.resolve(__dirname, '../libs/ui-mobile/src'),
      '@clean-rn/account/domain': path.resolve(__dirname, '../libs/account/domain/src'),
      // Ajoutez d'autres alias pour les packages partagés si nécessaire
    },
    watchFolders: [
      ...defaultConfig.watchFolders,
      path.resolve(__dirname, '../libs/ui-mobile/src'),
      path.resolve(__dirname, '../libs/account/domain/src'),
      // Ajoutez d'autres dossiers de packages partagés si nécessaire
    ],
    // unstable_enablePackageExports: true,
  },
};

module.exports = withNxMetro(mergeConfig(defaultConfig, customConfig), {
  debug: false,
  extensions: [],
  watchFolders: [],
});
