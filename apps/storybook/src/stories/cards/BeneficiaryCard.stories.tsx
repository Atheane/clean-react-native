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
    disabled: false,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
};

export default BeneficiaryCardMeta;

type BeneficiaryCardStory = ComponentStory<typeof BeneficiaryCard>;

export const EvenLogo: BeneficiaryCardStory = (args) => {
  return <BeneficiaryCard {...args} idx={2} onDelete={undefined} onPress={undefined} />;
};

export const EvenGenericPress: BeneficiaryCardStory = (args) => {
  return (
    <BeneficiaryCard
      {...args}
      data={{
        beneficiaryId: 1,
        name: 'John Doe',
        iban: 'ES6621000418450200051332',
        bic: 'BCITESMMXXX',
      }}
      idx={4}
      onDelete={undefined}
    />
  );
};

export const EvenCO2Delete: BeneficiaryCardStory = (args) => {
  return (
    <BeneficiaryCard
      {...args}
      data={{
        beneficiaryId: 1,
        name: 'John Doe',
        iban: 'ES6621000418450200051332',
        bic: 'BCITESMMXXX',
        accountId: 1,
      }}
      idx={6}
      onPress={undefined}
    />
  );
};

export const Odd: BeneficiaryCardStory = (args) => {
  return <BeneficiaryCard {...args} idx={1} onDelete={undefined} onPress={undefined} />;
};

export const OddPress: BeneficiaryCardStory = (args) => {
  return <BeneficiaryCard {...args} idx={3} onDelete={undefined} />;
};

export const OddDelete: BeneficiaryCardStory = (args) => {
  return <BeneficiaryCard {...args} idx={5} onPress={undefined} />;
};

export const Disabled: BeneficiaryCardStory = (args) => {
  return <BeneficiaryCard {...args} disabled={true} idx={7} onDelete={undefined} />;
};
