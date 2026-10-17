import { registerRootComponent } from 'expo';
import * as Sentry from '@sentry/react-native';

import App from './src/app/App';

Sentry.init({
  dsn: 'https://60e7bf4b37653a1348de2aab6104d9ae@o231473.ingest.sentry.io/4505743451553792',
  environment: process.env.NODE_ENV,
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
