import { Story } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';

export const withCenterView = (Story: Story) => {
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
