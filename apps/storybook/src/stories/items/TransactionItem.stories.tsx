import { StyleProp, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { Colors, Love, TransactionItem } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const TransactionItemMeta: ComponentMeta<typeof TransactionItem> = {
  title: 'Items/TransactionItem',
  component: TransactionItem,
  args: {
    icon: () => (
      <Love
        width={23}
        height={23}
        style={{ color: Colors.bank.primary.lightGreen } as StyleProp<ViewStyle>}
      />
    ),
    amount: 131,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default TransactionItemMeta;

type TransactionItemStory = ComponentStory<typeof TransactionItem>;

export const PositiveAmount: TransactionItemStory = (args) => {
  const { t } = useTranslation();
  return <TransactionItem {...args} label={t('screens.account.transfer') + ' Marie Dupond'} />;
};
export const NegativeAmount: TransactionItemStory = (args) => {
  const { t } = useTranslation();

  return <TransactionItem {...args} amount={-49} label={t('screens.account.transfer') + ' Marie Dupond'} />;
};
