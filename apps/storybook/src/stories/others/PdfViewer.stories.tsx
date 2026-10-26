import type { Meta, StoryObj } from '@storybook/react';
import { PdfViewer } from '@clean-rn/ui-mobile';

const meta = {
  title: 'Others/PdfViewer',
  component: PdfViewer,
  argTypes: {
    handleError: {
      action: 'handleError',
    },
  },
} as Meta<typeof PdfViewer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    uri: 'https://example.com/assets/docs/cgu.pdf',
  },
};
