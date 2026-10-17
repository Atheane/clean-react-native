import { StyleProp, ViewStyle } from 'react-native';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { Colors, Love, TransactionItem } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../wrappers';

const TransactionItemMeta: ComponentMeta<typeof TransactionItem> = {
  title: 'Others/TransactionItem',
  component: TransactionItem,
  args: {
    icon: () => (
      <Love
        width={23}
        height={23}
        style={{ color: Colors.icon.lightGreenTransparent } as StyleProp<ViewStyle>}
      />
    ),
    label: 'Virement Marie Dupond',
    amount: 131,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default TransactionItemMeta;

type TransactionItemStory = ComponentStory<typeof TransactionItem>;

export const Static: TransactionItemStory = (args) => <TransactionItem {...args} />;
