import type { Meta, StoryObj } from '@storybook/react';

import { IAccountType, Bic, Iban } from '@clean-rn/account/domain';
import { WhiteBalance } from '@clean-rn/ui-mobile';

import { ValidationStatus, WithBackground, WithStatusBelow } from '../../wrappers';

const meta = {
  title: 'Texts/WhiteBalance',
  component: WhiteBalance,
  argTypes: {
    onPress: { action: 'onPress' },
  },

  decorators: [(Story) => WithStatusBelow(Story, ValidationStatus.VALIDATED), WithBackground],
} as Meta<typeof WhiteBalance>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    account: {
      accountType: IAccountType.MAIN,
      authorizedBalance: 2354.58,
      accountId: 89698698,
      iban: new Iban('FR7616798000010000215323243'),
      bic: new Bic('TRZOFR21XXX'),
    },
  },
};
