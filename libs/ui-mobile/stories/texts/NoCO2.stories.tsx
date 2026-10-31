import type { Meta, StoryObj } from '@storybook/react';

import { NoCO2 } from '../../src/components/texts/no-co2';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Texts/NoCO2',
  component: NoCO2,
  decorators: [WithCenterView],
} as Meta<typeof NoCO2>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    text: 'NO CO2',
  },
};
