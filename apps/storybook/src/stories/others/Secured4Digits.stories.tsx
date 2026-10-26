import type { Meta, StoryObj } from '@storybook/react';

import { Secured4Digits } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Others/Secured4Digits',
  component: Secured4Digits,
  argTypes: {},
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} as Meta<typeof Secured4Digits>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    digits: [1, 2, 3, 4],
  },
};

export const Secured: Story = {
  args: {
    digits: [1, 2, 3, 4],
    hidden: true,
  },
};

export const Underlined: Story = {
  args: {
    digits: [1, 2, 3, 4],
    underlined: true,
  },
};
