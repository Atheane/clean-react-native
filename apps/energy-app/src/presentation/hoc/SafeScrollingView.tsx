import React, { forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Colors } from '@clean-rn/ui-mobile';

type IProps = {
  children: React.ReactElement;
};

export const SafeScrollingView = forwardRef<KeyboardAwareScrollView, IProps>(({ children }, ref) => {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} ref={ref}>
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.white,
  },
});
