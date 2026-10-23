import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { TransferCard, BankLogoCA, BankAltLogo, PhoneGradientWhiteBg } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const TransferCardMeta: ComponentMeta<typeof TransferCard> = {
  title: 'Cards/TransferCard',
  component: TransferCard,
  argTypes: {
    onSelect: { action: 'onSelect' },
  },
  args: {
    icon: BankLogoCA,
    text: 'Mmmmmm\nMmmmmmmmmmm',
    arrow: true,
    data: [
      {
        key: 'key1',
        value: 'value1',
      },
      {
        key: 'key2',
        value: 'value2',
      },
    ],
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
};

export default TransferCardMeta;

type TransferCardStory = ComponentStory<typeof TransferCard>;

export const TransferFrom: TransferCardStory = (args) => {
  return <TransferCard {...args} icon={BankAltLogo} />;
};

export const PayoutOut: TransferCardStory = (args) => {
  return <TransferCard {...args} arrow={false} icon={BankLogoCA} />;
};

export const TransferOut: TransferCardStory = (args) => {
  return <TransferCard {...args} arrow={false} icon={BankAltLogo} />;
};

export const WaitingTransaction: TransferCardStory = (args) => {
  return <TransferCard {...args} arrow={false} icon={PhoneGradientWhiteBg} />;
};
