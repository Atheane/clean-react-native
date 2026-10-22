import { registerRootComponent } from 'expo';
import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';
import * as firebase from 'firebase/app';

import App from './src/shared/presentation/App';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY,
  authDomain: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN,
  projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID,
  storageBucket: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID,
  measurementId: Constants.expoConfig?.extra?.FIREBASE_MEASUREMENT_ID,
};

console.log('>>>>>>>>>>>>>> firebaseConfig', firebaseConfig);

firebase.initializeApp(firebaseConfig);

if (Constants.expoConfig?.extra?.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: Constants.expoConfig?.extra?.SENTRY_DSN,
    environment: Constants.expoConfig?.extra?.NODE_ENV,
    enableNative: true,
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
  });
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
