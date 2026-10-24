import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { BeneficiaryItem, BankLogoCA } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const BeneficiaryItemMeta: ComponentMeta<typeof BeneficiaryItem> = {
  title: 'Items/BeneficiaryItem',
  component: BeneficiaryItem,
  argTypes: {
    onDelete: { action: 'onDelete' },
    onPress: { action: 'onPress' },
  },
  args: {
    icon: BankLogoCA,
    name: 'John Doe',
    iban: 'ES6621000418450200051332',
    beneficiaryId: 0,
    disabled: false,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
};

export default BeneficiaryItemMeta;

type BeneficiaryItemStory = ComponentStory<typeof BeneficiaryItem>;

export const Simple: BeneficiaryItemStory = (args) => {
  return <BeneficiaryItem {...args} onDelete={undefined} onPress={undefined} />;
};

export const Delete: BeneficiaryItemStory = (args) => {
  return <BeneficiaryItem {...args} onPress={undefined} />;
};

export const Chevron: BeneficiaryItemStory = (args) => {
  return <BeneficiaryItem {...args} onDelete={undefined} />;
};

export const DisabledChevron: BeneficiaryItemStory = (args) => {
  return <BeneficiaryItem {...args} onDelete={undefined} disabled />;
};

export const DisabledDelete: BeneficiaryItemStory = (args) => {
  return <BeneficiaryItem {...args} onPress={undefined} disabled />;
};
