import { Image, View, StyleSheet } from 'react-native';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { LoanHeater } from '../../../assets/images';

import { ShareScreen } from '@clean-rn/ui-mobile';

const ShareScreenMeta: ComponentMeta<typeof ShareScreen> = {
  title: 'Others/ShareScreen',
  component: ShareScreen,
};

export default ShareScreenMeta;

export const Static: ComponentStory<typeof ShareScreen> = () => (
  <ShareScreen>
    <View style={styles.container}>
      <Image source={LoanHeater} />
    </View>
  </ShareScreen>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
