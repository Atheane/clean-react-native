import type { Meta, StoryObj } from '@storybook/react';

import { BalanceList } from '../../src/components/lists/balance-list';
import { Colors } from '../../src/constants';

import { WithBackground } from '../../wrappers';

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
        title: 'main',
        unit: '€G',
      },
      {
        value: 54.67,
        uid: '9876987097',
        title: 'restoflash',
        unit: '€G',
      },
      {
        value: 30,
        uid: '97878756745',
        title: 'weflo',
        unit: '€G',
      },
    ],
    color: '#fff',
  },
  decorators: [WithBackground],
} as Meta<typeof BalanceList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Grey: Story = {
  args: {
    color: Colors.primary.darkGrey,
  },
};
