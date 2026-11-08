/* eslint-disable */
import { registerRootComponent } from 'expo';
import { decode } from 'base-64';

// 1. Polyfill en premier
global.atob = decode;

// 3. Autres imports
import * as Sentry from '@sentry/react-native';
import Geocoder from 'react-native-geocoding';
import App from './src/shared/presentation/App';

console.log('>>>>>>>>>> ENVIRONMENT', process.env.EXPO_PUBLIC_NODE_ENV);
console.log('>>>>>>>>>> SENTRY DSN', process.env.EXPO_PUBLIC_SENTRY_DSN);
if (process.env.EXPO_PUBLIC_NODE_ENV !== 'development') {
  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    environment: process.env.EXPO_PUBLIC_NODE_ENV,
    enableNative: false, // Disabled native SDK to avoid compilation issues with Xcode 16.0
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
    _experiments: {
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    },
    integrations: [Sentry.mobileReplayIntegration()],
  });
  console.log = () => {
    return;
  };
}

Geocoder.init(process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY);

console.warn = () => {
  return;
};
console.disableYellowBox = true;

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
