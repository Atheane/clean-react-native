import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { BeneficiaryCardList } from '@clean-rn/ui-mobile';

import { ValidationStatus, WithCenterView, WithStatus } from '../../wrappers';

const BeneficiaryCardListMeta: ComponentMeta<typeof BeneficiaryCardList> = {
  title: 'Lists/BeneficiaryCardList',
  component: BeneficiaryCardList,
  argTypes: {
    onPress: { action: 'onPress' },
    onDelete: { action: 'onDelete' },
  },
  args: {
    data: [
      {
        accountId: 1,
        beneficiaryId: 1,
        name: 'John Doe',
        iban: 'ES6621000418450200051331',
        bic: 'BCIRESMMXXX',
      },
      {
        beneficiaryId: 2,
        name: 'Marie Jeanne',
        iban: 'FR4621000418450200051332',
        bic: 'BCIRESMMXXX',
      },
      {
        accountId: 2,
        beneficiaryId: 3,
        name: 'Jeanne Durut',
        iban: 'FR4621000418450200051333',
        bic: 'BCIRESMMXXX',
      },
    ],
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
};

export default BeneficiaryCardListMeta;

type BeneficiaryCardListStory = ComponentStory<typeof BeneficiaryCardList>;

export const OnPress: BeneficiaryCardListStory = (args) => (
  <BeneficiaryCardList {...args} onPress={args.onPress} onDelete={undefined} />
);

export const OnDelete: BeneficiaryCardListStory = (args) => (
  <BeneficiaryCardList {...args} onPress={undefined} onDelete={args.onDelete} />
);
