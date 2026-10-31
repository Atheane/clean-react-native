import type { Meta, StoryObj } from '@storybook/react';
import { DraggableLinePlot } from '../../src/components/charts/draggable-line-plot';
import { Colors } from '../../src/constants';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Charts/DraggableLinePlot',
  component: DraggableLinePlot,
  argTypes: {
    handleDrag: { action: 'handleDrag' },
  },
  decorators: [WithCenterView],
} satisfies Meta<typeof DraggableLinePlot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TwoLines: Story = {
  args: {
    data: [
      [17.5, 20, 19.5, 21, 24, 25, 27.7, 25, 26, 25, 20, 17.5, 18],
      [19.5, 20, 19.5, 20, 22, 23, 24, 23, 24.5, 23, 21, 20.5, 19.5],
    ],
    labels: ['Baseline', 'After renovation'],
    colors: [Colors.secondary.pink, Colors.primary.darkBlue],
    xlabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
};
