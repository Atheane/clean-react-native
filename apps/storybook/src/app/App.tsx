/* eslint-disable @typescript-eslint/no-var-requires */
import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';
const AppEntryPoint = require('./.storybook').default;

if (Constants.expoConfig?.extra?.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: Constants.expoConfig?.extra?.SENTRY_DSN,
    environment: Constants.expoConfig?.extra?.NODE_ENV,
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
  });
}

export default AppEntryPoint;
