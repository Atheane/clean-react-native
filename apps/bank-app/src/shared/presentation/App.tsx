import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Image, AppState, AppStateStatus, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@rneui/themed';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import { ConfigCatProvider, createConsoleLogger, LogLevel } from 'configcat-react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useNotification } from './hooks';

import SplashScreen from '../../../assets/images/splash.png';
import { store, persistor } from '../application/usecases/root-saga';
import { IRootState } from '../application/state-management/reducers/root-reducer';
import { initializeApplication } from '../application/commands/initialize-application';
import { fetchLogout } from '../../auth/application/commands';

import { Fonts } from './constants';
import { theme } from './theme';
import { useDeepLink } from './hooks';
import { NavigationUI } from './navigation';
import i18n from './translations/i18n';

const App: () => JSX.Element = () => {
  const [fontsLoaded] = useFonts(Fonts);
  const dispatch = useDispatch();
  const { pending } = useSelector((state: IRootState) => state.initialization);
  const { error } = useSelector((state: IRootState) => state.unknownError);
  const logger = createConsoleLogger(LogLevel.Info);
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState || 'unknown');

  useEffect(() => {
    dispatch(initializeApplication());
  }, [dispatch]);

  useDeepLink();

  const { t } = useTranslation();

  // Effet pour gérer les erreurs réseau - placé au niveau supérieur
  useEffect(() => {
    if (error?.message === 'Network request failed') {
      console.log('Erreur réseau détectée');
      Alert.alert(t('notification.network-error.title'), t('notification.network-error.body'), [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      dispatch(fetchLogout());
    }
  }, [error, t, dispatch]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.match(/active/) && nextAppState.match(/inactive/)) {
        // L'application est passée en arrière-plan ou est devenue inactive
        console.log("L'application a été quitée");
        persistor.purge();
      }
      setAppState(nextAppState);
    };

    const appStateListener = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      appStateListener.remove();
    };
  }, [appState]);

  return fontsLoaded && !pending && process.env.EXPO_PUBLIC_CONFIG_CAT_API_KEY ? (
    <ConfigCatProvider sdkKey={process.env.EXPO_PUBLIC_CONFIG_CAT_API_KEY as string} options={{ logger }}>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <NavigationUI />
          <StatusBar />
        </I18nextProvider>
      </ThemeProvider>
    </ConfigCatProvider>
  ) : (
    <SafeAreaView style={[styles.container, { marginBottom: 30, marginLeft: 10 }]}>
      <Image source={SplashScreen} style={{ width: 250, height: 500 }} />
    </SafeAreaView>
  );
};

const ReduxApp = () => {
  return (
    <>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
      <Toast />
    </>
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
