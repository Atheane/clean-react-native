import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Colors } from '@clean-rn/ui-mobile';

type IProps = {
  fixedHeight?: boolean;
  children: React.ReactElement;
  ref?: React.RefObject<KeyboardAwareScrollView>;
};

export const SafeScrollingView = ({ children, ref }: IProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} ref={ref}>
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bank.primary.white,
  },
});
