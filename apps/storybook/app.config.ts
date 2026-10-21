import 'dotenv/config';

export default {
  expo: {
    name: 'CleanRN Storybook Dev',
    slug: 'clean-rn-storybook-dev',
    version: '1.5.4',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: 'com.example.storybookdev',
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.example.storybookdev',
    },
    web: {
      favicon: './assets/images/favicon.png',
      bundler: 'metro',
    },
    plugins: [
      [
        '@config-plugins/detox',
        {
          skipProguard: false,
          subdomains: '*',
        },
      ],
      [
        'react-native-document-scanner-plugin',
        {
          cameraPermission: 'Cette application nécessite un accès à la caméra, pour les scans de documents.',
        },
      ],
      ['react-native-compressor'],
    ],
    extra: {
      NODE_ENV: process.env.NODE_ENV,
      SENTRY_DSN: process.env.SENTRY_DSN,
      eas: {
        projectId: '81d27718-8c2e-42f6-911b-8d4af2c80097',
      },
    },
  },
};
