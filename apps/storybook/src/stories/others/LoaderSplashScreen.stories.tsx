import type { Meta, StoryObj } from '@storybook/react';

import { LoaderSplashScreen } from '@clean-rn/ui-mobile';

const meta = {
  title: 'Others/Loader',
  component: LoaderSplashScreen,
} as Meta<typeof LoaderSplashScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
