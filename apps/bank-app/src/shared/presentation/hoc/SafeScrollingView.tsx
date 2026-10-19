import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Colors } from '@clean-rn/ui-mobile';

type IProps = {
  fixedHeight?: boolean;
  children: React.ReactElement;
};

export const SafeScrollingView = ({ children, fixedHeight }: IProps) => {
  return (
    <SafeAreaView style={[styles.container, fixedHeight ? { height: Dimensions.get('window').height } : {}]}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>{children}</KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bank.primary.white,
  },
});
