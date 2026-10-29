import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '@clean-rn/ui-mobile';

export const WithBackground = (Story: React.ComponentType) => {
  return (
    <View style={styles.container}>
      <Story />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.lightGreen,
  },
});
