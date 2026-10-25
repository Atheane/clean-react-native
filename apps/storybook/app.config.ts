import 'dotenv/config';

export default {
  expo: {
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
      bundleIdentifier: process.env.EXPO_PUBLIC_BUNDLE_IDENTIFIER,
      googleServicesFile: process.env.EXPO_PUBLIC_GOOGLE_PLIST,
      supportsTablet: true,
      versionCode: process.env.EXPO_PUBLIC_APP_VERSION,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: process.env.EXPO_PUBLIC_BUNDLE_IDENTIFIER,
      googleServicesFile: process.env.EXPO_PUBLIC_GOOGLE_SERVICES,
      versionCode: process.env.EXPO_PUBLIC_APP_VERSION_ANDROID,
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
    extra: {
      eas: {
        projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
      },
    },
  },
};
