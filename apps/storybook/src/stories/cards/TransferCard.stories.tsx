import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { TransferCard } from '@clean-rn/ui-mobile';
import { BankLogoCA, BankLogoCO2 } from '../../../assets/images';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const TransferCardMeta: ComponentMeta<typeof TransferCard> = {
  title: 'Cards/TransferCard',
  component: TransferCard,
  argTypes: {
    onSelect: { action: 'onSelect' },
  },
  args: {
    image: BankLogoCA,
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
  return <TransferCard {...args} image={BankLogoCO2} />;
};

export const TransferTo: TransferCardStory = (args) => {
  return <TransferCard {...args} arrow={false} image={BankLogoCA} />;
};
