import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import { useFonts } from 'expo-font';
import { ThemeProvider } from '@rneui/themed';
import { Fonts, theme, i18n } from '@clean-rn/ui-mobile';

export const App: () => JSX.Element = () => {
  const [fontsLoaded] = useFonts(Fonts);
  return fontsLoaded ? (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <SafeAreaView style={styles.container}>
          <Text>BankApp</Text>
        </SafeAreaView>
      </I18nextProvider>
    </ThemeProvider>
  ) : (
    <SafeAreaView>
      <Text>Loading Font...</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
