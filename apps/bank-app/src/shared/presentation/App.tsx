import { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@rneui/themed';

import { Fonts, theme, i18n, LoaderSplashScreen, useDeepLink } from '@clean-rn/ui-mobile';

import { store } from '../application/state-management/state/store';
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

  return fontsLoaded && !pending ? (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <NavigationUI />
        <StatusBar />
      </I18nextProvider>
    </ThemeProvider>
  ) : (
    <SafeAreaView style={styles.container}>
      <LoaderSplashScreen />
    </SafeAreaView>
  );
};

const ReduxApp = () => {
  return (
    <Provider store={store}>
      <App />
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
