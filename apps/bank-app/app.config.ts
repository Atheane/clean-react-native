import 'dotenv/config';

export default {
  expo: {
    owner: '450',
    name: process.env.APP_NAME_BANK_APP || 'Bank App',
    slug: process.env.SLUG_NAME_BANK_APP || 'bank-app',
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
      versionCode: process.env.APP_VERSION || '1.0.4',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/android-logo-bank.png',
        backgroundColor: '#FFFFFF',
      },
      supportsTablet: false,
      package: process.env.BUNDLE_IDENTIFIER || 'com.example.bankapp',
      googleServicesFile: process.env.GOOGLE_SERVICES || './google-services.json',
      versionCode: process.env.APP_VERSION_ANDROID || '104',
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
          contactsPermission:
            'Transfer your €G directly to mobile numbers. Example: you send a transfer of €G10 to 06 01 01 01 01 rather than FR76 0001 XO01 XO01 XO01 XO01 X11.',
        },
      ],
      [
        'react-native-document-scanner-plugin',
        {
          cameraPermission: 'The application requires access to the camera for document scans.',
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
