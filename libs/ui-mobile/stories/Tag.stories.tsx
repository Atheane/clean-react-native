import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from '../src/components/tags';

const meta: Meta<typeof Tag> = {
  component: Tag,
  title: 'Example/Tag',
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Primary: Story = {
  args: {
    text: 'Tag',
  },
};
