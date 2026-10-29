import type { Meta, StoryObj } from '@storybook/react';

import { TableCO2Baseline } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus } from '../../wrappers';

const meta = {
  title: 'Tables/TableCO2Baseline',
  component: TableCO2Baseline,
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING)],
} as Meta<typeof TableCO2Baseline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FourColumns: Story = {
  args: {
    tableHead: ['Voiture', 'Logement', 'Total', 'Evité'],
    tableData: [
      ['1987 kg', '1000 kg', '2987 kg', '0 kg'],
      ['1787 kg', '700 kg', '2487 kg', '500 kg'],
      ['1787 kg', '900 kg', '2687 kg', '300 kg'],
      [],
    ],
    baselineText: 'Baseline',
    buttonTitle: 'Add data',
    tagText: 'N.A',
    rowLabels: ['2019-2020', '2022', '2023', '2024'],
  },
};

export const NoData: Story = {
  args: {
    tableHead: ['Voiture', 'Logement', 'Total', 'Evité'],
    tableData: [],
    rowLabels: [],
    baselineText: 'Baseline',
    buttonTitle: 'Add data',
    tagText: '',
  },
};
