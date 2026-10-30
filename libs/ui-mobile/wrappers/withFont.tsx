import { useFonts } from 'expo-font';
import { SafeAreaView, Text } from 'react-native';
import { Fonts } from '../src/constants';

export const WithFont = (Story: React.ComponentType) => {
  const [fontsLoaded] = useFonts(Fonts);
  console.log('fontsLoaded >>>>>>>>>', fontsLoaded);
  return fontsLoaded ? (
    <Story />
  ) : (
    <SafeAreaView>
      <Text>Loading Font...</Text>
    </SafeAreaView>
  );
};
