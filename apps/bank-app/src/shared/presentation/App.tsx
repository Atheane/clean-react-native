import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@rneui/themed';

import { Fonts, theme, i18n } from '@clean-rn/ui-mobile';

import { store } from '../application/state-management/store';
import { NavigationUI } from './navigation';

const App: () => JSX.Element = () => {
  const [fontsLoaded] = useFonts(Fonts);
  return fontsLoaded ? (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <NavigationUI />
        <StatusBar />
      </I18nextProvider>
    </ThemeProvider>
  ) : (
    <SafeAreaView style={styles.container}>
      <Text>Loading Font...</Text>
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
