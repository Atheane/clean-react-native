import type { Meta, StoryObj } from '@storybook/react';

import { TouchCardText } from '../../src/components/cards/touch-card-text';
import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Cards/TouchCardText',
  component: TouchCardText,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  decorators: [WithCenterView],
} satisfies Meta<typeof TouchCardText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    text: 'This is a text with some information in it...',
  },
};
