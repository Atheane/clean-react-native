import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeScrollingView } from '@clean-rn/ui-mobile';

const HEIGHT = Dimensions.get('window').height;

export const WithKeyboardAwareScroll = (Story: React.ComponentType) => {
  return (
    <SafeScrollingView>
      <View style={[styles.container, { height: HEIGHT }]}>
        <Story />
      </View>
    </SafeScrollingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '4%',
    alignItems: 'center',
  },
  image: {
    width: 146,
    height: 146,
  },
});
