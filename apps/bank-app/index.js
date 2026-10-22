import { registerRootComponent } from 'expo';
import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';
import App from './src/shared/presentation/App';
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY,
  databaseURL: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN, //maybe a hack, careful if firebase bug
  projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID,
  storageBucket: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID,
  measurementId: Constants.expoConfig?.extra?.FIREBASE_MEASUREMENT_ID,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

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
