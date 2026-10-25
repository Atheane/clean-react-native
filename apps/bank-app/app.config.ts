import 'dotenv/config';

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
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: process.env.EXPO_PUBLIC_BUNDLE_IDENTIFIER || 'com.example.bankapp',
      googleServicesFile: process.env.EXPO_PUBLIC_GOOGLE_PLIST || './GoogleService-Info.plist',
      supportsTablet: false,
      versionCode: process.env.EXPO_PUBLIC_APP_VERSION || '122',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/android-logo-bank.png',
        backgroundColor: '#FFFFFF',
      },
      supportsTablet: false,
      package: process.env.EXPO_PUBLIC_BUNDLE_IDENTIFIER || 'com.example.bankapp',
      googleServicesFile: process.env.EXPO_PUBLIC_GOOGLE_SERVICES || './google-services.json',
      versionCode: process.env.EXPO_PUBLIC_APP_VERSION_ANDROID || '122',
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
          android: {
            usesClearTextTraffic: false,
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
