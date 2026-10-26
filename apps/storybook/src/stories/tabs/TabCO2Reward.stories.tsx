import type { Meta, StoryObj } from '@storybook/react';

import { TabCO2Reward } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus } from '../../wrappers';

const meta = {
  title: 'Tabs/CO2Reward',
  component: TabCO2Reward,
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING)],
} as Meta<typeof TabCO2Reward>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TwoColumns: Story = {
  args: {
    tableHead: ['Prime CO2', 'Emissions'],
    tableData: [
      ['N.A', 'N.A'],
      ['59€G', '1987 kg CO2'],
      ['59€G', '2039 kg CO2'],
      ['59€G', '2139 kg CO2'],
    ],
    rowLabels: ['2024', '2023', '2022', '2021'],
  },
};
