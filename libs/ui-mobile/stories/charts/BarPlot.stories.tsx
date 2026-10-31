import type { Meta, StoryObj } from '@storybook/react';
import { BarPlot } from '../../src/components/charts/bar-plot';
import { Colors } from '../../src/constants';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Charts/BarPlot',
  component: BarPlot,
  argTypes: {},
  decorators: [WithCenterView],
} satisfies Meta<typeof BarPlot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const One: Story = {
  args: {
    title: 'Current consumption (kWh)',
    subtitle: '',
    data: [[124.5, 123.5, 122.5, 85.5, 70.5, 71.5, 64.5, 50.5, 67.5, 77.5, 97.5, 123.5]],
    labels: ['Current consumption'],
    colors: [Colors.primary.darkBlue],
    xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    yAxisLabel: 'kWh',
  },
};
