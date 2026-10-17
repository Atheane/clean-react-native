import React from 'react';
import { Story } from '@storybook/react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const WithScroll = (Story: Story) => {
  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <Story />
    </KeyboardAwareScrollView>
  );
};
