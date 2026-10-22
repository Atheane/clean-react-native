import { ComponentStory, ComponentMeta } from '@storybook/react-native';
import { BankLogoCA, BeneficiaryCard } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const BeneficiaryCardMeta: ComponentMeta<typeof BeneficiaryCard> = {
  title: 'Cards/BeneficiaryCard',
  component: BeneficiaryCard,
  argTypes: {
    onDelete: { action: 'onDelete' },
    onPress: { action: 'onPress' },
  },
  args: {
    data: {
      icon: BankLogoCA,
      beneficiaryId: 1,
      name: 'John Doe',
      iban: 'ES6621000418450200051332',
      bic: 'BCITESMMXXX',
    },
    idx: 0,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
};

export default BeneficiaryCardMeta;

type BeneficiaryCardStory = ComponentStory<typeof BeneficiaryCard>;

export const Even: BeneficiaryCardStory = (args) => {
  return <BeneficiaryCard {...args} onDelete={undefined} onPress={undefined} />;
};

export const Odd: BeneficiaryCardStory = (args) => {
  return <BeneficiaryCard {...args} idx={1} onDelete={undefined} />;
};

export const EvenDelete: BeneficiaryCardStory = (args) => {
  return <BeneficiaryCard {...args} onPress={undefined} />;
};

export const OddPress: BeneficiaryCardStory = (args) => {
  return <BeneficiaryCard {...args} idx={1} onDelete={undefined} />;
};
