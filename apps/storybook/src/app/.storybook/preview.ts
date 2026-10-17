import { WithTheme, WithFont, WithTranslations } from '../wrappers';
export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [WithTheme, WithFont, WithTranslations];
