import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@rneui/themed';
import SplashScreen from '../../../assets/images/splash.png';
import * as Notifications from 'expo-notifications';
import { PersistGate } from 'redux-persist/integration/react';

import { Fonts, theme, i18n, useDeepLink } from '@clean-rn/ui-mobile';

import { store, persistor } from '../application/usecases/root-saga';
import { NavigationUI } from './navigation';
import { IRootState } from '../../shared/application/state-management/reducers/root-reducer';
import { initializeApplication } from '../../shared/application/commands/initialize-application';

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

  return fontsLoaded && !pending ? (
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
