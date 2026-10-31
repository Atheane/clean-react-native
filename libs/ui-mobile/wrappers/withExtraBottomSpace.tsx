import React from 'react';
import { StyleSheet, View } from 'react-native';

export const WithExtraBottomSpace = (Story: React.ComponentType) => {
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
