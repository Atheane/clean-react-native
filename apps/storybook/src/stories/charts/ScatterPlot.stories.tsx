import type { Meta, StoryObj } from '@storybook/react';
import { ScatterPlot, Colors } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Charts/ScatterPlot',
  component: ScatterPlot,
  argTypes: {},
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
} satisfies Meta<typeof ScatterPlot>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    data: {
      Baseline: [
        [10.0, 8.04],
        [8.0, 6.95],
        [13.0, 7.58],
        [9.0, 8.81],
        [11.0, 8.33],
        [14.0, 9.96],
        [6.0, 7.24],
        [4.0, 4.26],
        [12.0, 10.84],
        [7.0, 4.82],
        [5.0, 5.68],
        [0, 3],
        [5, 5.5],
        [10, 8],
        [15, 10.5],
        [20, 13],
      ],
    },
    labels: ['Baseline'],
    yLabel: '',
    xLabel: '',
    colors: [Colors.primary.darkBlue],
  },
};

export const SoloRegression: Story = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    data: {
      Baseline: [
        [10.0, 8.04],
        [8.0, 6.95],
        [13.0, 7.58],
        [9.0, 8.81],
        [11.0, 8.33],
        [14.0, 9.96],
        [6.0, 7.24],
        [4.0, 4.26],
        [12.0, 10.84],
        [7.0, 4.82],
        [5.0, 5.68],
        [0, 3],
        [5, 5.5],
        [10, 8],
        [15, 10.5],
        [20, 13],
      ],
    },
    labels: ['Baseline'],
    yLabel: '',
    xLabel: '',
    colors: [Colors.primary.darkBlue],
    regression: [
      {
        label: 'y = 0.5 * x + 3',
        labelPosition: [20, 13],
        data: [
          [0, 3],
          [20, 13],
        ],
      },
    ],
  },
};

export const Duo: Story = {
  args: {
    title: 'Title',
    subtitle: 'Subtitle',
    data: {
      Baseline: [
        [10.0, 8.04],
        [8.0, 6.95],
        [13.0, 7.58],
        [9.0, 8.81],
        [11.0, 8.33],
        [14.0, 9.96],
        [6.0, 7.24],
        [4.0, 4.26],
        [12.0, 10.84],
        [7.0, 4.82],
        [5.0, 5.68],
      ],
      Veolia: [
        [10.0, 7.46],
        [8.0, 6.77],
        [13.0, 12.74],
        [9.0, 7.11],
        [11.0, 7.81],
        [14.0, 8.84],
        [6.0, 6.08],
        [4.0, 5.39],
        [12.0, 8.15],
        [7.0, 6.42],
        [5.0, 5.73],
      ],
    },
    labels: ['Baseline', 'Veolia'],
    yLabel: '',
    xLabel: '',
    colors: [Colors.primary.darkBlue, Colors.secondary.pink],
  },
};

export const DuoRegression: Story = {
  args: {
    title: 'Baseline before and after renovation',
    subtitle: '',
    data: {
      Baseline: [
        [10.0, 8.04],
        [8.0, 6.95],
        [13.0, 7.58],
        [9.0, 8.81],
        [11.0, 8.33],
        [14.0, 9.96],
        [6.0, 7.24],
        [4.0, 4.26],
        [12.0, 10.84],
        [7.0, 4.82],
        [5.0, 5.68],
      ],
      'After Renovation': [
        [10.0, 7.46],
        [8.0, 6.77],
        [13.0, 12.74],
        [9.0, 7.11],
        [11.0, 7.81],
        [14.0, 8.84],
        [6.0, 6.08],
        [4.0, 5.39],
        [12.0, 8.15],
        [7.0, 6.42],
        [5.0, 5.73],
      ],
    },
    labels: ['Baseline', 'After Renovation'],
    xLabel: 'HDD (18 C°)',
    yLabel: '        kWh consumption',
    colors: [Colors.primary.darkBlue, Colors.secondary.pink],
    regression: [
      {
        label: 'y = 0.5 * x + 3',
        labelPosition: [20, 13],
        data: [
          [0, 3],
          [20, 13],
        ],
      },
      {
        label: 'y = 0.4 * x + 2',
        labelPosition: [20, 7],
        data: [
          [0, 4],
          [18, 10],
        ],
      },
    ],
  },
};
