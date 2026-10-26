import type { Meta, StoryObj } from '@storybook/react';
import { WithStatus, ValidationStatus, WithKeyboardAwareScroll } from '../../wrappers';

import { DocumentPicker } from '@clean-rn/ui-mobile';

const meta = {
  title: 'Others/DocumentPicker',
  component: DocumentPicker,
  argTypes: {
    handleError: { action: 'handleError' },
    getDocument: { action: 'getDocument' },
    setLoading: { action: 'setLoading' },
  },
  decorators: [WithKeyboardAwareScroll, (Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
} as Meta<typeof DocumentPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
