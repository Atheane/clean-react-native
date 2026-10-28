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
    buttonTitle: 'Add data',
    tagText: 'N.A',
  },
};

const { tableHead, tableData, rowLabels } = {
  tableHead: ['      kWh', 'Green\n euros', 'Comfort\nprice'],
  tableData: [
    ['89.5', '3.1 €G', '1074'],
    ['80.5', '2.8 €G', '966'],
    ['70.5', '2.5 €G', '846'],
    ['65.5', '2.3 €G', '786'],
    ['64.5', '2.3 €G', '774'],
    ['64.5', '2.3 €G', '774'],
    ['60.5', '2.1 €G', '726'],
    ['50.5', '1.8 €G', '606'],
    ['55.5', '1.9 €G', '666'],
    ['68.5', '2.4 €G', '822'],
    ['90.5', '3.2 €G', '1086'],
    ['100.5', '3.5 €G', '1206'],
  ],
  rowLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};
export const FourColumns: Story = {
  args: {
    tableHead,
    tableData,
    rowLabels,
    buttonTitle: 'Add data',
    tagText: 'N.A',
  },
};
