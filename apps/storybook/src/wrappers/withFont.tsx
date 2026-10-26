import { useFonts } from 'expo-font';
import { SafeAreaView, Text } from 'react-native';
import { Fonts } from '@clean-rn/ui-mobile';

export const WithFont = (Story: React.ComponentType) => {
  const [fontsLoaded] = useFonts(Fonts);
  return fontsLoaded ? (
    <Story />
  ) : (
    <SafeAreaView>
      <Text>Loading Font...</Text>
    </SafeAreaView>
  );
};
