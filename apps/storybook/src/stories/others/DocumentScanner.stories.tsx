import type { Meta, StoryObj } from '@storybook/react';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';

import { DocumentScanner } from '@clean-rn/ui-mobile';

const meta = {
  title: 'Others/DocumentScanner',
  component: DocumentScanner,
  argTypes: {
    handleError: { action: 'handleError' },
    getScan: { action: 'getScan' },
    setLoading: { action: 'setLoading' },
  },
  decorators: [WithKeyboardAwareScroll, (Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
} as Meta<typeof DocumentScanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    buttonTitle: 'Document Scanner',
  },
};
