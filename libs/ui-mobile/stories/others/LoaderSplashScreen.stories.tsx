import type { Meta, StoryObj } from '@storybook/react';

import { LoaderSplashScreen } from '../../src/components/others/loader-splash-screen';
import { WithCenterView } from '../../wrappers';

const meta = {
  title: 'Others/Loader',
  decorators: [WithCenterView],
  component: LoaderSplashScreen,
} as Meta<typeof LoaderSplashScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
