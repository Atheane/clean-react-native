import type { Meta, StoryObj } from '@storybook/react';

import { TableConsumption } from '../../src/components/tables/consumption';

import { WithScroll } from '../../wrappers';

const meta = {
  title: 'Tables/TableConsumption',
  component: TableConsumption,
  decorators: [WithScroll],
} as Meta<typeof TableConsumption>;

export default meta;

type Story = StoryObj<typeof meta>;

const { head, data, tags, rowLabels, tagHeader } = {
  head: ['Mois', 'Conso de \nréférence', 'Conso\ncible', 'Conso\nactuelle', 'Economie'],
  data: [
    ['372 kWh', '372 kWh', '372 kWh', '9,9 %'],
    ['372 kWh', '372 kWh', '372 kWh', '9,9 %'],
    ['372 kWh', '372 kWh', '372 kWh', '9,9 %'],
    ['372 kWh', '372 kWh', '372 kWh', '9,9 %'],
    ['372 kWh', '372 kWh', '372 kWh', '9,9 %'],
    ['372 kWh', '372 kWh', '372 kWh', '9,9 %'],
    ['372 kWh', '372 kWh', '372 kWh', '9,9 %'],
    ['372 kWh', '372 kWh', '372 kWh', '9,9 %'],
    ['372 kWh', '372 kWh', '372 kWh', '9,9 %'],
    ['372 kWh', '372 kWh', '372 kWh', '9,9 %'],
    ['372 kWh', '372 kWh', '372 kWh', '9,9 %'],
    ['372 kWh', '372 kWh', '372 kWh', '9,9 %'],
  ],
  tags: [
    ['200', '200', '200'],
    ['200', '200', '200'],
    ['200', '200', '200'],
    ['200', '200', '200'],
    ['200', '200', '200'],
    ['200', '200', '200'],
    ['372', '372', '372'],
    ['372', '372', '372'],
    ['372', '372', '372'],
    ['372', '372', '372'],
    ['372', '372', '372'],
    ['372', '372', '372'],
  ],
  tagHeader: 'Prix-confort',
  rowLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

export const Basic: Story = {
  args: {
    head,
    data,
    tags,
    tagHeader,
    rowLabels,
  },
};
