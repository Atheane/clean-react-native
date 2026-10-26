import type { Meta, StoryObj } from '@storybook/react';

import { TabCO2Split } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus } from '../../wrappers';

const meta = {
  title: 'Tabs/CO2Split',
  component: TabCO2Split,
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING)],
} as Meta<typeof TabCO2Split>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FourColumns: Story = {
  args: {
    tableHead: ['Logement', 'Voiture', 'Total', 'Evité'],
    tableData: [
      ['1000 kg', '1987 kg', '2987 kg', '0 kg'],
      ['700 kg', '1787 kg', '2487 kg', '500 kg'],
      ['900 kg', '1787 kg', '2687 kg', '300 kg'],
      ['N.A', 'N.A'],
    ],
    rowLabels: ['2019-2020', '2022', '2023', '2024'],
  },
};
