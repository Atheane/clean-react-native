import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Banner as StaticBanner } from '../../src/components/banners/banner';
import { BannerColors } from '../../src/types';

const meta = {
  title: 'Banners/StaticBanner',
  component: StaticBanner,
  argTypes: {
    onPressRightIcon: { action: 'onPressRightIcon' },
  },
  decorators: [
    (Story) => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
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

const error = new Error('Invalid IBAN');
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
