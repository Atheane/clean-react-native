import type { Meta, StoryObj } from '@storybook/react';

import { AccountError } from '@clean-rn/account/domain';
import { Banner as StaticBanner, BannerColors } from '@clean-rn/ui-mobile';

import { WithStatus, ValidationStatus } from '../../wrappers';

const meta = {
  title: 'Banners/StaticBanner',
  component: StaticBanner,
  argTypes: {
    onPressRightIcon: { action: 'onPressRightIcon' },
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED)],
} satisfies Meta<typeof StaticBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const UpdateNeeded: Story = {
  args: {
    title: 'Update application',
    colorBanner: BannerColors.PINK,
    rightIcon: true,
  },
};

const error = new AccountError.InvalidIban('Invalid IBAN');
export const ErrorMessage: Story = {
  args: {
    title: error.message,
    colorBanner: BannerColors.PINK,
    rightIcon: true,
    onPressRightIcon: undefined,
  },
};

export const IdentityValidation: Story = {
  args: {
    title: 'Update application',
    colorBanner: BannerColors.PURPLE,
    rightIcon: true,
  },
};
