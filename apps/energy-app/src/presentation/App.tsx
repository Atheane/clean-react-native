import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, StyleSheet, Image, AppState, AppStateStatus, Dimensions } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@rneui/themed';
import { PersistGate } from 'redux-persist/integration/react';
import * as Notifications from 'expo-notifications';
import { theme } from './theme';
import { Fonts } from './constants';
import { i18n } from './translations';
import { initializeApplication } from '../application/commands/initialize-application';
import { store, persistor } from '../application/usecases/root-saga';
import { NavigationUI } from './navigation';
import Splash from '../../assets/splash.png';
import { IRootState } from '../application/state-management/reducers/root-reducer';

const App: () => JSX.Element = () => {
  const [fontsLoaded] = useFonts(Fonts);
  const dispatch = useDispatch();

  const { pending } = useSelector((state: IRootState) => state.initialization);

  const { error } = useSelector((state: IRootState) => state.unknownError);

  const [appState, setAppState] = useState(AppState.currentState || 'unknown');
  useEffect(() => {
    dispatch(initializeApplication());
  }, [dispatch]);

  if (error?.message === 'Network request failed') {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'No internet connection',
        body: 'Please check your internet connection and try again',
      },
      trigger: null,
    });
  }

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

  return fontsLoaded && !pending ? (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <NavigationUI />
        <StatusBar />
      </I18nextProvider>
    </ThemeProvider>
  ) : (
    <SafeAreaView style={[styles.container, { marginBottom: 30, marginLeft: 20 }]}>
      <Image
        source={Splash}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          marginBottom: 24,
        }}
        resizeMode="contain"
      />
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
