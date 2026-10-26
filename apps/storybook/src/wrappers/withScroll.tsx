import { ScrollView } from 'react-native';

export const WithScroll = (Story: React.ComponentType) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Story />
    </ScrollView>
  );
};
