import 'dotenv/config';
const withDisabledAndroidLint = require('./expo-plugins/disable-android-lint');

export default {
  expo: {
    owner: '450',
    name: 'Bank App',
    slug: process.env.EXPO_PUBLIC_SLUG_NAME_BANK_APP,
    version: process.env.EXPO_PUBLIC_APP_VERSION,
    orientation: 'portrait',
    icon: './assets/images/logo-bank.png',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    jsEngine: 'hermes',
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: process.env.EXPO_PUBLIC_BUNDLE_IDENTIFIER || 'com.example.bankapp',
      googleServicesFile: './GoogleService-Info.plist', // https://docs.expo.dev/versions/latest/config/app/#infoplist
      supportsTablet: false,
      versionCode: process.env.EXPO_PUBLIC_APP_VERSION || '301',
      buildNumber: process.env.EXPO_PUBLIC_APP_VERSION || '301',
      entitlements: {
        'aps-environment': 'production', // Obligatoire pour les notifications
      },
      infoPlist: {
        UIBackgroundModes: ['remote-notification'],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/android-logo-bank.png',
        backgroundColor: '#FFFFFF',
      },
      supportsTablet: false,
      package: process.env.EXPO_PUBLIC_BUNDLE_IDENTIFIER || 'com.example.bankapp',
      googleServicesFile: './google-services.json',
      versionCode: process.env.EXPO_PUBLIC_APP_VERSION || '301',
      proguard: true, // ou false
      permissions: [
        'android.permission.POST_NOTIFICATIONS', // SDK 33+
      ],
    },
    web: {
      favicon: './assets/images/logo-bank.png',
      bundler: 'metro',
    },
    plugins: [
      withDisabledAndroidLint,
      'expo-font',
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
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static', //  https://rnfirebase.io/#managed-workflow: For iOS only, since firebase-ios-sdk requires use_frameworks then you want to configure expo-build-properties app.json by adding "useFrameworks": "static". See the example configuration below.
          },
          android: {
            usesClearTextTraffic: false,
            minSdkVersion: 24, // does-not prevent lint pb on android with
            targetSdkVersion: 35, // required for august 2025
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
    scheme: process.env.EXPO_PUBLIC_BUNDLE_IDENTIFIER || 'com.example.bankapp',
    extra: {
      eas: {
        projectId: process.env.EXPO_PUBLIC_PROJECT_ID || '00000000-0000-0000-0000-000000000000',
      },
    },
  },
};
