import { registerRootComponent } from 'expo';
import * as Sentry from '@sentry/react-native';

import App from './src/app/App';

Sentry.init({
  dsn: 'https://524e4f782ba5cfafe68ec4cc9fe3d808@o231473.ingest.sentry.io/4505743473246208',
  environment: process.env.NODE_ENV,
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
