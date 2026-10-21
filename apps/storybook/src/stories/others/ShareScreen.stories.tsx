import { Image, View, StyleSheet, Text } from 'react-native';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { LoanHeater } from '../../../assets/images';

import { ShareScreen } from '@clean-rn/ui-mobile';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

const ShareScreenMeta: ComponentMeta<typeof ShareScreen> = {
  title: 'Others/ShareScreen',
  component: ShareScreen,
  argTypes: {
    handleError: {
      action: 'handleError',
    },
  },
  args: {
    title: (
      <View>
        <Text>Mon Bilan carbone</Text>
      </View>
    ),
    children: (
      <View style={styles.container}>
        <Image source={LoanHeater} />
      </View>
    ),
    message: `Hello,\n\nJe viens de faire mon bilan carbone en deux minutes. Hyper intéressant.\n\nMon bilan carbone est de 2,2 tCO2.\n\nDécouvre le tien aussi et dis moi combien tu pèses !\n\nSur iOS:\n\nhttps://apps.apple.com/fr/app/bank-app/id0000000000?l=fr-FR\n\n sur Android:\n\nhttps://play.google.com/store/apps/details?id=com.example.energyapp`,
  },
};

export default ShareScreenMeta;

export const Static: ComponentStory<typeof ShareScreen> = (args) => <ShareScreen {...args} />;
