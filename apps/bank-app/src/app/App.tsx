import { SafeAreaView, StyleSheet } from 'react-native';
import { PrimaryButton, Love } from '@clean-rn/ui-mobile';

export const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PrimaryButton
        title="Hello"
        fixedSize
        onPress={() => {
          console.log('Pressed');
        }}
        iconOne={Love}
      />
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
