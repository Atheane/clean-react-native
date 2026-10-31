import { StyleSheet, View } from 'react-native';

export const WithCenterView = (Story: React.ComponentType) => {
  return (
    <View style={styles.main}>
      <Story />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
