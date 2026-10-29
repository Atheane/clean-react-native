import { registerRootComponent } from 'expo';
import * as Sentry from '@sentry/react-native';
import firebase from '@react-native-firebase/app';
import { decode } from 'base-64';
import Geocoder from 'react-native-geocoding';

import App from './src/shared/presentation/App';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  databaseURL: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN, //maybe a hack, careful if firebase bug
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

//polyfill for jwt-decode
global.atob = decode;

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

Geocoder.init(process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY);

console.warn = () => {
  return;
};
console.disableYellowBox = true;

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
