import type { Meta, StoryObj } from '@storybook/react';

import { KycId, IconTextItem } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Items/IconTextItem',
  component: IconTextItem,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} as Meta<typeof IconTextItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    icon: KycId,
    text: 'ID Card',
    validated: false,
  },
};

export const Validated: Story = {
  args: {
    icon: KycId,
    text: 'ID Card',
    validated: true,
  },
};
