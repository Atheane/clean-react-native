import type { Meta, StoryObj } from '@storybook/react';

import { Tag } from '../../src/components/tags';
import { Colors } from '../../src/constants';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Tags/Tag',
  component: Tag,
  args: {
    text: 'Non calculé',
    color: Colors.primary.lightGrey,
  },
  decorators: [WithCenterView],
} as Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Grey: Story = {
  args: {
    text: 'Non calculé',
    color: Colors.primary.lightGrey,
  },
};
