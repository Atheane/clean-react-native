import { Story } from '@storybook/react-native';
import { useFonts } from 'expo-font';
import { SafeAreaView, Text } from 'react-native';
import { Fonts } from '@clean-rn/ui-mobile';

export const WithFont = (Story: Story) => {
  const [fontsLoaded] = useFonts(Fonts);
  return fontsLoaded ? (
    <Story />
  ) : (
    <SafeAreaView>
      <Text>Loading Font...</Text>
    </SafeAreaView>
  );
};
