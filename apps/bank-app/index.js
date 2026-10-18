import { registerRootComponent } from 'expo';
import * as Sentry from '@sentry/react-native';

import Constants from 'expo-constants';

import App from './src/shared/presentation/App';

if (Constants.expoConfig?.extra?.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: Constants.expoConfig?.extra?.SENTRY_DSN,
    environment: Constants.expoConfig?.extra?.NODE_ENV,
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
  });
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
