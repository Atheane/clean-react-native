import 'dotenv/config';

export default {
  expo: {
    name: 'CleanRN BankApp Dev',
    slug: 'clean-rn-bank-app-dev',
    version: '1.5.1',
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
      bundleIdentifier: 'com.clean-rn.bank-appdev',
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.clean-rn.bank-appdev',
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
    scheme: 'com.clean-rn.bank-appdev',
    extra: {
      BASE_URL: process.env.BASE_URL,
      BASE_URL_API: process.env.BASE_URL_API,
      NODE_ENV: process.env.NODE_ENV,
      SENTRY_DSN: process.env.SENTRY_DSN,
      SUPPORTED_LANGUAGES_WEBSITE: process.env.SUPPORTED_LANGUAGES_WEBSITE,
      eas: {
        projectId: 'a7e1acaf-2f79-4e7a-8582-8cd0e216a793',
      },
    },
  },
};
