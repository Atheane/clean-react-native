import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { IAccountType, Bic, Iban } from '@clean-rn/account/domain';
import { WhiteBalance } from '@clean-rn/ui-mobile';

import { ValidationStatus, WithBackground, WithSwitchBelow } from '../wrappers';

const WhiteBalanceMeta: ComponentMeta<typeof WhiteBalance> = {
  title: 'Texts/WhiteBalance',
  component: WhiteBalance,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  args: {
    account: {
      accountType: IAccountType.MAIN,
      authorizedBalance: 2354.58,
      accountId: 89698698,
      iban: new Iban('FR7616798000010000215323243'),
      bic: new Bic('TRZOFR21XXX'),
    },
  },
  decorators: [
    (Story) => WithSwitchBelow(Story, ValidationStatus.PENDING),
    (Story) => WithBackground(Story, 480),
  ],
};

export default WhiteBalanceMeta;

type WhiteBalanceStory = ComponentStory<typeof WhiteBalance>;

export const Static: WhiteBalanceStory = (args) => <WhiteBalance {...args} />;
