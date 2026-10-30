// ./libs/ui-mobile/.storybook/main.ts
import type { StorybookConfig } from '@storybook/react-webpack5';
import { Configuration } from 'webpack';

const path = require('path');

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-controls',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-react-native-web',
      options: {
        modulesToTranspile: ['react-native-vector-icons'],
        projectRoot: '../../..',
      },
    },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config: Configuration) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
      'react-native-vector-icons': '@expo/vector-icons',
      '@clean-rn/acccount/domain': path.resolve(__dirname, '../../../libs/account/domain/src'),
      '@clean-rn/acccount/infrastructure': path.resolve(
        __dirname,
        '../../../libs/account/infrastructure/src',
      ),
      '@clean-rn/auth/domain': path.resolve(__dirname, '../../../libs/auth/domain/src'),
      '@clean-rn/auth/infrastructure': path.resolve(__dirname, '../../../libs/auth/infrastructure/src'),
      '@clean-rn/beneficiary/domain': path.resolve(__dirname, '../../../libs/beneficiary/domain/src'),
      '@clean-rn/beneficiary/infrastructure': path.resolve(
        __dirname,
        '../../../libs/beneficiary/infrastructure/src',
      ),
      '@clean-rn/card/domain': path.resolve(__dirname, '../../../libs/card/domain/src'),
      '@clean-rn/card/infrastructure': path.resolve(__dirname, '../../../libs/card/infrastructure/src'),
      '@clean-rn/contact/domain': path.resolve(__dirname, '../../../libs/contact/domain/src'),
      '@clean-rn/contact/infrastructure': path.resolve(
        __dirname,
        '../../../libs/contact/infrastructure/src',
      ),
      '@clean-rn/ddd': path.resolve(__dirname, '../../../libs/ddd/src'),
      '@clean-rn/device/domain': path.resolve(__dirname, '../../../libs/device/domain/src'),
      '@clean-rn/device/infrastructure': path.resolve(__dirname, '../../../libs/device/infrastructure/src'),
      '@clean-rn/footprint/domain': path.resolve(__dirname, '../../../libs/footprint/domain/src'),
      '@clean-rn/footprint/infrastructure': path.resolve(
        __dirname,
        '../../../libs/footprint/infrastructure/src',
      ),
      '@clean-rn/kyc/domain': path.resolve(__dirname, '../../../libs/kyc/domain/src'),
      '@clean-rn/kyc/infrastructure': path.resolve(__dirname, '../../../libs/kyc/infrastructure/src'),
      '@clean-rn/shared/domain': path.resolve(__dirname, '../../../libs/shared/domain/src'),
      '@clean-rn/shared/infrastructure': path.resolve(__dirname, '../../../libs/shared/infrastructure/src'),
      '@clean-rn/transaction/domain': path.resolve(__dirname, '../../../libs/transaction/domain/src'),
      '@clean-rn/transaction/infrastructure': path.resolve(
        __dirname,
        '../../../libs/transaction/infrastructure/src',
      ),
      '@clean-rn/user/domain': path.resolve(__dirname, '../../../libs/user/domain/src'),
      '@clean-rn/user/infrastructure': path.resolve(__dirname, '../../../libs/user/infrastructure/src'),
      '@clean-rn/utils': path.resolve(__dirname, '../../../libs/utils/src'),
    };

    config.module = config.module || { rules: [] };
    config.module.rules?.push({
      test: /\.html$/,
      use: 'html-loader',
    });
    config.module.rules?.push({
      test: /\.ttf$/,
      use: [{ loader: 'file-loader' }],
      include: path.resolve(__dirname, '../../../node_modules/react-native-vector-icons'),
    });
    config.module.rules?.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude:
        /node_modules[/\\](?!react-native-|@react-native-community|@react-navigation|react-native-vector-icons)|(react-native-ratings)|(react-native-view-shot)|(react-native-pdf)|(react-native-keyboard-aware-scroll-view)|(@rneui\/themed)|(@rneui\/base)/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@nx/react/babel',
                {
                  runtime: 'automatic',
                },
              ],
              '@babel/preset-env',
              '@babel/preset-typescript',
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
            ],
            plugins: [
              ['react-native-web', { commonjs: true }],
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-transform-private-methods', { loose: true }],
              ['@babel/plugin-transform-private-property-in-object', { loose: true }],
              ['@babel/plugin-transform-class-properties', { loose: true }],
            ],
          },
        },
      ],
    });

    // Add SVG handling rule
    config.module.rules?.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            native: true,
          },
        },
      ],
    });

    return config;
  },
};

export default config;
