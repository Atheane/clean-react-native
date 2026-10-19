import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Colors } from '@clean-rn/ui-mobile';

type IProps = {
  children: React.ReactElement;
};

export const SafeScrollingView = ({ children }: IProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>{children}</KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bank.primary.white,
    height: Dimensions.get('window').height * 1.4,
  },
});
