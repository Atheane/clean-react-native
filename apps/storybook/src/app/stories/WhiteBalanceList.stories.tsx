import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { IAccountType, Bic, Iban } from '@clean-rn/account/domain';
import { WhiteBalanceList } from '@clean-rn/ui-mobile';

import { ValidationStatus, WithBackground, WithSwitchBelow } from '../wrappers';

const WhiteBalanceListMeta: ComponentMeta<typeof WhiteBalanceList> = {
  title: 'Lists/WhiteBalanceList',
  component: WhiteBalanceList,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  args: {
    data: [
      {
        authorizedBalance: 2354.58,
        accountId: 89698698,
        accountType: IAccountType.MAIN,
        iban: new Iban('FR7616798000010000215323243'),
        bic: new Bic('TRZOFR21XXX'),
      },
      {
        authorizedBalance: 54.67,
        accountId: 9876987097,
        accountType: IAccountType.RESTOFLASH,
        iban: new Iban('FR7616798000010000215323243'),
        bic: new Bic('TRZOFR22XXX'),
      },
      {
        authorizedBalance: 30,
        accountId: 97878756745,
        accountType: IAccountType.WEFLO,
        iban: new Iban('FR7616798000010000215323243'),
        bic: new Bic('TRZOFR24XXX'),
      },
    ],
  },
  decorators: [
    (Story) => WithSwitchBelow(Story, ValidationStatus.PENDING),
    (Story) => WithBackground(Story, 250),
  ],
};

export default WhiteBalanceListMeta;

type WhiteBalanceListStory = ComponentStory<typeof WhiteBalanceList>;

export const Static: WhiteBalanceListStory = (args) => <WhiteBalanceList {...args} />;
