import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LongCard } from '../../src/components/cards/long-card';
import { ExportPdf } from '../../src/assets';
import { Colors } from '../../src/constants';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Cards/LongCard',
  component: LongCard,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  decorators: [WithCenterView],
} satisfies Meta<typeof LongCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    text: 'Current month',
    icon: () => <ExportPdf startColor={Colors.secondary.pink} endColor={Colors.primary.darkBlue} />,
    pressable: true,
  },
};
