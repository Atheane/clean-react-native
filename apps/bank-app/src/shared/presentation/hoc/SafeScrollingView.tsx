import React from 'react';
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Colors } from '@clean-rn/ui-mobile';

type IProps = {
  fixedHeight?: boolean;
  children: React.ReactElement;
  ref?: React.RefObject<KeyboardAwareScrollView>;
  backgroundColor?: string;
};

export const SafeScrollingView = ({ children, ref, backgroundColor }: IProps) => {
  return (
    <SafeAreaView style={backgroundColor ? { backgroundColor } : { backgroundColor: Colors.primary.white }}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} ref={ref}>
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
