import { SafeAreaView, StyleSheet } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import { PrimaryButton, LoveWhite, Validate, theme } from '@clean-rn/ui-mobile';

export const App = () => {
  return (
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
