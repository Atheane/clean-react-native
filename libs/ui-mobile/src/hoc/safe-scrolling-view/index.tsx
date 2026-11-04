import React from 'react';
import { View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Colors } from '../../constants';

type IProps = {
  children: React.ReactElement;
  ref?: React.RefObject<KeyboardAwareScrollView>;
};

export const SafeScrollingView = ({ children, ref }: IProps) => {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} ref={ref}>
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary.lightGrey,
  },
});
