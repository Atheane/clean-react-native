import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Image, AppState, AppStateStatus } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@rneui/themed';
import * as Notifications from 'expo-notifications';
import { PersistGate } from 'redux-persist/integration/react';
import i18n from '../presentation/translations/i18n';
import { useDeepLink } from '../../shared/presentation/hooks';

import { IRootState } from '../../shared/application/state-management/reducers/root-reducer';
import { initializeApplication } from '../../shared/application/commands/initialize-application';
import { Fonts } from '../../shared/presentation/constants';
import { theme } from './theme';
import { store, persistor } from '../application/usecases/root-saga';
import { NavigationUI } from './navigation';
import SplashScreen from '../../../assets/images/splash.png';
import { ConfigCatProvider, createConsoleLogger, LogLevel } from 'configcat-react';

// Initialize Firebase
const App: () => JSX.Element = () => {
  const [fontsLoaded] = useFonts(Fonts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApplication());
  }, [dispatch]);

  useDeepLink();

  const { pending } = useSelector((state: IRootState) => state.initialization);

  const { error } = useSelector((state: IRootState) => state.unknownError);

  const logger = createConsoleLogger(LogLevel.Info);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  const { t } = useTranslation();
  if (error?.message === 'Network request failed') {
    Notifications.scheduleNotificationAsync({
      content: {
        title: t('modal-error.network'),
      },
      trigger: null,
    });
  }

  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState || 'unknown');

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
