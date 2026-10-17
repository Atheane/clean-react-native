import { SafeAreaView, StyleSheet } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import { SecondaryButton, Love, theme } from '@clean-rn/ui-mobile';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <SecondaryButton
          title="Hello"
          fixedSize
          onPress={() => {
            console.log('Pressed');
          }}
          iconOne={Love}
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
