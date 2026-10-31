import type { Meta, StoryObj } from '@storybook/react';
import { PdfDownloader, Edit, Colors } from '@clean-rn/ui-mobile';

const meta = {
  title: 'Others/PdfDownloader',
  component: PdfDownloader,
  argTypes: {
    handleError: {
      action: 'handleError',
    },
  },
} as Meta<typeof PdfDownloader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    uri: 'https://www.africau.edu/images/default/sample.pdf',
    fileName: 'sample-test.pdf',
    icon: () => <Edit startColor={Colors.primary.darkBlue} endColor={Colors.secondary.pink} />,
  },
};
