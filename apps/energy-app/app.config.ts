import 'dotenv/config';

export default {
  expo: {
    name: 'EnergyApp',
    owner: '450',
    slug: process.env.EXPO_PUBLIC_SLUG_NAME_ENERGY_APP,
    version: process.env.EXPO_PUBLIC_APP_VERSION,
    scheme: process.env.EXPO_PUBLIC_BUNDLE_IDENTIFIER || 'com.energy-app.app',
    orientation: 'portrait',
    icon: './assets/icon.png',
    extra: {
      eas: {
        projectId: process.env.EXPO_PUBLIC_PROJECT_ID || '618ed0ba-31a1-41c1-9877-eef3e8981f19',
      },
    },
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: false,
      bundleIdentifier: process.env.EXPO_PUBLIC_BUNDLE_IDENTIFIER || 'com.energy-app.app',
      versionCode: process.env.EXPO_PUBLIC_APP_VERSION || '001',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      supportsTablet: false,
      package: process.env.EXPO_PUBLIC_BUNDLE_IDENTIFIER || 'com.energy-app.app',
      versionCode: process.env.EXPO_PUBLIC_APP_VERSION || '001',
    },
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro',
    },
    plugins: [
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
  },
};
