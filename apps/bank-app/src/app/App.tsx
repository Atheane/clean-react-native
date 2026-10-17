import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';
import { ThemeProvider } from '@rneui/themed';
import { PrimaryButton, LoveWhite, Validate, theme, Fonts } from '@clean-rn/ui-mobile';

export const App = () => {
  const [fontsLoaded] = useFonts(Fonts);
  return fontsLoaded ? (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <PrimaryButton
          title="Hello"
          large
          onPress={() => {
            console.log('Pressed');
          }}
          iconOne={LoveWhite}
          iconTwo={Validate}
        />
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
