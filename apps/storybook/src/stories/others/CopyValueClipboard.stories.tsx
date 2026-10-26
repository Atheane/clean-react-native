import type { Meta, StoryObj } from '@storybook/react';

import { CopyValueClipboard, Iban as IbanIcon, Bic as BicIcon } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const meta = {
  title: 'Others/CopyValueClipboard',
  component: CopyValueClipboard,
  argTypes: {},
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
} as Meta<typeof CopyValueClipboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Iban: Story = {
  args: {
    value: 'FR7616798000010000215323243',
    icon: IbanIcon,
  },
};

export const Bic: Story = {
  args: {
    value: 'TRZOFR21XXX',
    icon: BicIcon,
  },
};
