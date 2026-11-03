import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Colors } from '../constants';

type IProps = {
  fixedHeight?: boolean;
  children: React.ReactElement;
  backgroundColor?: string;
};

export const SafeScrollingView = forwardRef<KeyboardAwareScrollView, IProps>(
  ({ children, backgroundColor }, ref) => {
    return (
      <View style={backgroundColor ? { backgroundColor } : { backgroundColor: Colors.primary.white }}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} ref={ref}>
          {children}
        </KeyboardAwareScrollView>
      </View>
    );
  },
);
