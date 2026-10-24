/* eslint-disable @typescript-eslint/no-var-requires */
import * as Sentry from '@sentry/react-native';
const AppEntryPoint = require('./.storybook').default;

if (process.env.EXPO_PUBLIC_NODE_ENV !== 'development') {
  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    environment: process.env.EXPO_PUBLIC_NODE_ENV,
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
  });
}

export default AppEntryPoint;
