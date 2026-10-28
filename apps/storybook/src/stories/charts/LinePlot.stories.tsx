import type { Meta, StoryObj } from '@storybook/react';
import { LinePlot, Colors } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Charts/LinePlot',
  component: LinePlot,
  argTypes: {
    // onDataChange: { action: 'onDataChange' },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
} satisfies Meta<typeof LinePlot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OneLine: Story = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    data: [[17.5, 20, 19.5, 21, 24, 25, 27.7, 25, 26, 25, 20, 17.5, 18]],
    labels: ['Baseline'],
    colors: [Colors.primary.darkBlue],
    yLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    yAxisLabel: 'C°',
  },
};

export const TwoLines: Story = {
  args: {
    title: 'Indoor Air Temperature (C°)',
    subtitle: '',
    data: [
      [17.5, 20, 19.5, 21, 24, 25, 27.7, 25, 26, 25, 20, 17.5, 18],
      [19.5, 20, 19.5, 20, 22, 23, 24, 23, 24.5, 23, 21, 20.5, 19.5],
    ],
    labels: ['Baseline', 'After renovation'],
    colors: [Colors.primary.darkBlue, Colors.secondary.pink],
    yLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    yAxisLabel: 'C°',
  },
};
