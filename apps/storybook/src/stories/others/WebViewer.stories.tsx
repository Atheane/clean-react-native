import type { Meta, StoryObj } from '@storybook/react';
import { WebViewer } from '@clean-rn/ui-mobile';

const meta = {
  title: 'Others/WebViewer',
  component: WebViewer,
} as Meta<typeof WebViewer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    uri: 'https://example.com/green-euro-intro',
  },
};
