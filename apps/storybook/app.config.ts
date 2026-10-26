import 'dotenv/config';

export default {
  expo: {
    owner: '450',
    name: process.env.EXPO_PUBLIC_APP_NAME_STORYBOOK,
    slug: process.env.EXPO_PUBLIC_SLUG_NAME_STORYBOOK,
    version: process.env.EXPO_PUBLIC_APP_VERSION,
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
      bundleIdentifier: process.env.EXPO_PUBLIC_BUNDLE_IDENTIFIER || 'com.example.storybookdev',
      googleServicesFile: process.env.EXPO_PUBLIC_GOOGLE_PLIST || './GoogleService-Info.plist',
      supportsTablet: false,
      versionCode: process.env.EXPO_PUBLIC_APP_VERSION || '122',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      supportsTablet: false,
      package: process.env.EXPO_PUBLIC_BUNDLE_IDENTIFIER || 'com.example.storybookdev',
      googleServicesFile: process.env.EXPO_PUBLIC_GOOGLE_SERVICES || './google-services.json',
      versionCode: process.env.EXPO_PUBLIC_APP_VERSION_ANDROID || '122',
    },
    web: {
      favicon: './assets/images/favicon.png',
      bundler: 'metro',
    },
    plugins: [
      'expo-localization',
      [
        '@config-plugins/detox',
        {
          skipProguard: false,
          subdomains: '*',
        },
      ],
      ['@react-native-firebase/app'],
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
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
    ],
    scheme: process.env.EXPO_PUBLIC_BUNDLE_IDENTIFIER || 'com.example.storybookdev',
    extra: {
      eas: {
        projectId: process.env.EXPO_PUBLIC_PROJECT_ID || '2636226e-0146-4039-94a7-5c5f73f05f75',
      },
    },
  },
};
