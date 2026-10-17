import { ScrollView } from 'react-native';
import { Story } from '@storybook/react-native';

export const WithScroll = (Story: Story) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Story />
    </ScrollView>
  );
};
