import type { Meta, StoryObj } from '@storybook/react';

import { GreenBackButton } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus } from '../../wrappers';

const meta = {
  title: 'Buttons/GreenBackButton',
  component: GreenBackButton,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
} satisfies Meta<typeof GreenBackButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Validate',
  },
};
