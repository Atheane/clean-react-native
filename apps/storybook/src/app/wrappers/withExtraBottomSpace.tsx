import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Story } from '@storybook/react-native';

export const WithExtraBottomSpace = (Story: Story) => {
  return (
    <View style={styles.container}>
      <Story />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 100,
  },
});
