import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Image, AppState, AppStateStatus } from 'react-native';
import { useDispatch } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@rneui/themed';
import { PersistGate } from 'redux-persist/integration/react';
import { theme } from './theme';
import { Fonts } from './constants';
import { i18n } from './translations';
import { initializeApplication } from '../application/commands/initialize-application';
import { store, persistor } from '../application/usecases/root-saga';
import { NavigationUI } from './navigation';
import SplashScreen from '../../assets/splash.png';

// Initialize Firebase
const App: () => JSX.Element = () => {
  const [fontsLoaded] = useFonts(Fonts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApplication());
  }, [dispatch]);

  const [appState, setAppState] = React.useState<AppStateStatus>(AppState.currentState || 'unknown');

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/active/) && nextAppState.match(/inactive/)) {
        // L'application est passée en arrière-plan ou est devenue inactive
        console.log("L'application a été quittée");
        persistor.purge();
      }
      setAppState(nextAppState);
    };

    const appStateListener = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      appStateListener.remove();
    };
  }, [appState]);

  return fontsLoaded ? (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <NavigationUI />
        <StatusBar />
      </I18nextProvider>
    </ThemeProvider>
  ) : (
    <SafeAreaView style={[styles.container, { marginBottom: 30, marginLeft: 10 }]}>
      <Image source={SplashScreen} style={{ width: 250, height: 500 }} />
    </SafeAreaView>
  );
};

const ReduxApp = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default ReduxApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
