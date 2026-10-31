import type { Meta, StoryObj } from '@storybook/react';

import { Colors, Tag } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Tags/Tag',
  component: Tag,
  args: {
    text: 'Non calculé',
    color: Colors.primary.lightGrey,
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} as Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Grey: Story = {
  args: {
    text: 'Non calculé',
    color: Colors.primary.lightGrey,
  },
};
