import type { Preview } from '@storybook/react';
import { WithTheme, WithFont } from '../wrappers';

const preview: Preview = {
  decorators: [WithTheme, WithFont],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
