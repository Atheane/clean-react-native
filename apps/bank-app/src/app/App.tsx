import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { ThemeProvider } from '@rneui/themed';
import { Fonts, theme } from '@clean-rn/ui-mobile';

export const App: () => JSX.Element = () => {
  const [fontsLoaded] = useFonts(Fonts);
  return fontsLoaded ? (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <Text>BankApp</Text>
      </SafeAreaView>
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
