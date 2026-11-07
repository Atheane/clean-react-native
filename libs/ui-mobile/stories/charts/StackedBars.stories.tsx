import type { Meta, StoryObj } from '@storybook/react';
import { StackedBars } from '../../src/components/charts/stacked-bars';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Charts/StackedBars',
  component: StackedBars,
  argTypes: {},
  decorators: [WithCenterView],
} satisfies Meta<typeof StackedBars>;

export default meta;

type Story = StoryObj<typeof meta>;

const labelsMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const actual = [4, 3, 3, 4, 1, 1.2, 0.6, 5, 4, 1, 2, 1.5];
const expected = [0.1, 0.1, 0.1, 0.2, 0.3, 0.4, 0.2, 0.1, 0.2, 0.3, 0.7, 0.5];

export const MonthlyConsumption: Story = {
  args: {
    categories: ['Consommation actuelle', 'Objectif de consommation après travaux'],
    labels: labelsMonth,
    actual: actual,
    expected: expected,
  },
};

export const NoData: Story = {
  args: {
    categories: [],
    labels: [],
    actual: [],
    expected: [],
  },
};
