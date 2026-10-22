import 'dotenv/config';

export default {
  expo: {
    name: 'CleanRN BankApp Dev',
    slug: process.env.SLUG_NAME_BANK_APP,
    version: process.env.APP_VERSION,
    orientation: 'portrait',
    icon: './assets/images/logo-bank.png',
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
      googleServicesFile: './GoogleService-Info.plist',
      supportsTablet: false,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/android-logo-bank.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.clean-rn.bank-appdev',
      googleServicesFile: './google-services.json',
    },
    web: {
      favicon: './assets/images/logo-bank.png',
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
      ['@react-native-firebase/app'],
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
    ],
    scheme: 'com.clean-rn.bank-appdev',
    extra: {
      BASE_URL: process.env.BASE_URL,
      BASE_URL_API: process.env.BASE_URL_API,
      NODE_ENV: process.env.NODE_ENV,
      SENTRY_DSN: process.env.SENTRY_DSN,
      SUPPORTED_LANGUAGES_WEBSITE: process.env.SUPPORTED_LANGUAGES_WEBSITE,
      APP_VERSION: process.env.APP_VERSION,
      eas: {
        projectId: process.env.PROJECT_ID,
      },
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },
};
