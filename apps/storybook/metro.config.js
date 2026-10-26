const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNxMetro } = require('@nx/expo');
const { mergeConfig } = require('metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const { generate } = require('@storybook/react-native/scripts/generate');

generate({
  configPath: path.resolve(__dirname, './src/.storybook'),
});

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

defaultConfig.transformer.unstable_allowRequireContext = true;
defaultConfig.resolver.sourceExts.push('mjs');

// Ajoutez les alias nécessaires pour résoudre les packages partagés
defaultConfig.resolver.alias = {
  ...defaultConfig.resolver.alias,
  '@clean-rn/ui-mobile': path.resolve(__dirname, '../libs/ui-mobile/src'),
  '@clean-rn/account/domain': path.resolve(__dirname, '../libs/account/domain/src'),
  // Ajoutez d'autres alias pour les packages partagés si nécessaire
};

// Configurez les dossiers à surveiller pour les packages partagés
defaultConfig.watchFolders = [
  ...defaultConfig.watchFolders,
  path.resolve(__dirname, '../libs/ui-mobile/src'),
  path.resolve(__dirname, '../libs/account/domain/src'),
  // Ajoutez d'autres dossiers de packages partagés si nécessaire
];

const customConfig = {
  transformer: {
    babelTransformerPath: require.resolve('./customTransformer'),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    blockList: exclusionList([/^(?!.*node_modules).*\/dist\/.*/]),
  },
};

module.exports = withNxMetro(mergeConfig(defaultConfig, customConfig), {
  debug: false,
  extensions: [],
  watchFolders: [],
});
