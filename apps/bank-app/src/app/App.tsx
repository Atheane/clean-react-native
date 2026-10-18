import { SafeAreaView, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native';
import { useFonts } from 'expo-font';
import { ThemeProvider } from '@rneui/themed';
import { PrimaryButton, Love, Validate, theme, Fonts, Colors } from '@clean-rn/ui-mobile';

export const App: () => JSX.Element = () => {
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
          iconOne={() => (
            <Love
              width={23}
              height={23}
              style={{ color: Colors.bank.primary.white } as StyleProp<ViewStyle>}
            />
          )}
          iconTwo={() => (
            <Validate
              width={23}
              height={23}
              style={{ color: Colors.bank.primary.white } as StyleProp<ViewStyle>}
            />
          )}
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
