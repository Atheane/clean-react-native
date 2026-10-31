import type { Meta, StoryObj } from '@storybook/react';
import { TileKpi, GreenEuro, CarbonFootprint } from '@clean-rn/ui-mobile';
import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Cards/TileKpi',
  component: TileKpi,
  decorators: [WithCenterView],
} satisfies Meta<typeof TileKpi>;

export default meta;

type Story = StoryObj<typeof meta>;

export const KpiImg: Story = {
  args: {
    title: 'My title',
    img: GreenEuro,
    data: {
      kpi: '1245',
    },
  },
};

export const KpiIcon: Story = {
  args: {
    title: 'My title',
    icon: () => <CarbonFootprint width={40} height={40} />,
    data: {
      kpi: '1245',
    },
  },
};

export const KpiIconHelp: Story = {
  args: {
    title: 'My title',
    icon: () => <CarbonFootprint width={40} height={40} />,
    data: {
      kpi: '1245',
    },
    help: true,
  },
  argTypes: {
    handleHelp: { action: 'handleHelp' },
  },
};

export const TextImg: Story = {
  args: {
    title: 'My title',
    img: GreenEuro,
    data: {
      text: 'This is a text...',
    },
  },
};

export const TextIcon: Story = {
  args: {
    title: 'My title',
    icon: () => <CarbonFootprint width={40} height={40} />,
    data: {
      text: 'This is a text...',
    },
  },
};

export const TextIcoHelp: Story = {
  args: {
    title: 'My title',
    icon: () => <CarbonFootprint width={40} height={40} />,
    data: {
      text: 'This is a text...',
    },
    help: true,
  },
  argTypes: {
    handleHelp: { action: 'handleHelp' },
  },
};
