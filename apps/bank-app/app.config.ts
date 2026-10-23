import 'dotenv/config';

export default {
  expo: {
    owner: '450',
    name: 'Bank App',
    slug: 'bank-app',
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
      bundleIdentifier: process.env.BUNDLE_IDENTIFIER || 'com.example.bankapp',
      googleServicesFile: process.env.GOOGLE_PLIST || './GoogleService-Info.plist',
      supportsTablet: false,
      versionCode: process.env.APP_VERSION || '1.0.3',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/android-logo-bank.png',
        backgroundColor: '#FFFFFF',
      },
      package: process.env.BUNDLE_IDENTIFIER || 'com.example.bankapp',
      googleServicesFile: process.env.GOOGLE_SERVICES || './google-services.json',
      versionCode: process.env.APP_VERSION_ANDROID || '103',
    },
    web: {
      favicon: './assets/images/logo-bank.png',
      bundler: 'metro',
    },
    plugins: [
      'expo-localization',
      [
        'expo-contacts',
        {
          contactsPermission: 'Allow BANK to access your contacts.',
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
      [
        '@config-plugins/detox',
        {
          skipProguard: false,
          subdomains: '*',
        },
      ],
    ],
    scheme: process.env.BUNDLE_IDENTIFIER,
    extra: {
      APP_VERSION: process.env.APP_VERSION,
      BASE_URL: process.env.BASE_URL,
      BASE_URL_API: process.env.BASE_URL_API,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      NODE_ENV: process.env.NODE_ENV,
      eas: {
        projectId: process.env.PROJECT_ID,
      },
      SENTRY_DSN: process.env.SENTRY_DSN,
      SUPPORTED_LANGUAGES_WEBSITE: process.env.SUPPORTED_LANGUAGES_WEBSITE,
    },
  },
};
