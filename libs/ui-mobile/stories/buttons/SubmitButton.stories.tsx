import type { StoryObj } from '@storybook/react';
import { SubmitButton } from '../../src/components/buttons/submit-button';

import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Buttons/SubmitButton',
  component: SubmitButton,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
  },
  decorators: [WithCenterView],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    title: 'Valider',
    uppercase: false,
    disabled: false,
  },
};

export const Loading: Story = {
  args: {
    title: 'Loading...',
    uppercase: false,
    disabled: false,
    loading: true,
  },
};
