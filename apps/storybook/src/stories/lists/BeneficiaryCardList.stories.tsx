import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { BeneficiaryCardList } from '@clean-rn/ui-mobile';

import { ValidationStatus, WithCenterView, WithStatus } from '../../wrappers';

const BeneficiaryCardListMeta: ComponentMeta<typeof BeneficiaryCardList> = {
  title: 'Lists/BeneficiaryCardList',
  component: BeneficiaryCardList,
  argTypes: {
    onDelete: { action: 'onDelete' },
  },
  args: {
    data: [
      {
        beneficiaryId: 1,
        name: 'John Doe',
        iban: 'ES6621000418450200051332',
        bic: 'BCIRESMMXXX',
      },
      {
        beneficiaryId: 2,
        name: 'Marie Jeanne',
        iban: 'FR4621000418450200051332',
        bic: 'BCIRESMMXXX',
      },
      {
        beneficiaryId: 3,
        name: 'Jeanne Durut',
        iban: 'FR4621000418450200051332',
        bic: 'BCIRESMMXXX',
      },
    ],
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
};

export default BeneficiaryCardListMeta;

type BeneficiaryCardListStory = ComponentStory<typeof BeneficiaryCardList>;

export const Static: BeneficiaryCardListStory = (args) => <BeneficiaryCardList {...args} />;
