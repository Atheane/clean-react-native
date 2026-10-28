import type { Meta, StoryObj } from '@storybook/react';
import { BarPlot, Colors } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Charts/BarPlot',
  component: BarPlot,
  argTypes: {},
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
} satisfies Meta<typeof BarPlot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OneLine: Story = {
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
