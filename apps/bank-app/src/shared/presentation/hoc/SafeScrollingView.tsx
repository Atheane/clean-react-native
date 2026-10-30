import React, { forwardRef } from 'react';
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Colors } from '@clean-rn/ui-mobile';

type IProps = {
  fixedHeight?: boolean;
  children: React.ReactElement;
  backgroundColor?: string;
};

export const SafeScrollingView = forwardRef<KeyboardAwareScrollView, IProps>(
  ({ children, backgroundColor }, ref) => {
    return (
      <SafeAreaView style={backgroundColor ? { backgroundColor } : { backgroundColor: Colors.primary.white }}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} ref={ref}>
          {children}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  },
);
