import { StyleSheet, View } from 'react-native';
import { Story } from '@storybook/react-native';

export const WithCenterView = (Story: Story) => {
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
