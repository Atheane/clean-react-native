import type { Meta, StoryObj } from '@storybook/react';

import { IAccountType } from '@clean-rn/account/domain';
import { BalanceList, Colors } from '@clean-rn/ui-mobile';

import { ValidationStatus, WithBackground, WithStatusBelow } from '../../wrappers';

const meta = {
  title: 'Lists/BalanceList',
  component: BalanceList,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  args: {
    noDataLabel: 'No accounts',
    data: [
      {
        value: 2354.58,
        uid: '89698698',
        title: IAccountType.MAIN,
        unit: '€G',
      },
      {
        value: 54.67,
        uid: '9876987097',
        title: IAccountType.RESTOFLASH,
        unit: '€G',
      },
      {
        value: 30,
        uid: '97878756745',
        title: IAccountType.WEFLO,
        unit: '€G',
      },
    ],
    color: '#fff',
  },
  decorators: [(Story) => WithStatusBelow(Story, ValidationStatus.VALIDATED), WithBackground],
} as Meta<typeof BalanceList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Grey: Story = {
  args: {
    color: Colors.primary.darkGrey,
  },
};
