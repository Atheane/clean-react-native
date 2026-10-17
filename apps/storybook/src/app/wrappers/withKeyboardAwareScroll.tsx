import { Story } from '@storybook/react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const WithKeyboardAwareScroll = (Story: Story) => {
  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <Story />
    </KeyboardAwareScrollView>
  );
};
