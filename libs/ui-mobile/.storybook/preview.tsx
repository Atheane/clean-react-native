// ./libs/ui-mobile/.storybook/preview.tsx
import type { Preview } from '@storybook/react';
import { WithTheme, WithFont } from '../wrappers';
import 'reflect-metadata';

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
