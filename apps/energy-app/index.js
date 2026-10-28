import { registerRootComponent } from 'expo';
import * as Sentry from '@sentry/react-native';

import App from './src/presentation/App';

console.log('>>>>>>>>>> ENVIRONMENT', process.env.EXPO_PUBLIC_NODE_ENV);
if (process.env.EXPO_PUBLIC_NODE_ENV !== 'development') {
  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    environment: process.env.EXPO_PUBLIC_NODE_ENV,
    enableNative: true,
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
  });
  console.log = () => {
    return;
  };
}

registerRootComponent(App);
