import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { BeneficiaryItem, BankLogoCA } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const BeneficiaryItemMeta: ComponentMeta<typeof BeneficiaryItem> = {
  title: 'Items/BeneficiaryItem',
  component: BeneficiaryItem,
  argTypes: {
    onDelete: { action: 'onDelete' },
  },
  args: {
    icon: BankLogoCA,
    name: 'John Doe',
    iban: 'ES6621000418450200051332',
    beneficiaryId: 0,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
};

export default BeneficiaryItemMeta;

type BeneficiaryItemStory = ComponentStory<typeof BeneficiaryItem>;

export const Static: BeneficiaryItemStory = (args) => {
  return <BeneficiaryItem {...args} />;
};
