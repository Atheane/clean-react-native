import { useTranslation } from 'react-i18next';
import type { Meta, StoryObj } from '@storybook/react';
import { SubmitButton } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Buttons/SubmitButton',
  component: SubmitButton,
  argTypes: {
    onSubmit: { action: 'onSubmit' },
  },
  args: {
    title: 'Valider',
    uppercase: false,
    disabled: false,
  },
  decorators: [(Story: any) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
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
