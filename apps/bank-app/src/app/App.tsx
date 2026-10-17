import { SafeAreaView, StyleSheet } from 'react-native';
import { PrimaryButton, Love } from '@bank/ui-mobile';

export const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PrimaryButton
        title="Hello"
        pressed={false}
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
  }
})

export default App;
