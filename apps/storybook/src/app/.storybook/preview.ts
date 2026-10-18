import { WithTheme, WithFont, WithTranslations } from '../wrappers';
export const parameters = {
  controls: {
    matchers: {
      date: /Date$/,
    },
  },
};

export const decorators = [WithTheme, WithFont, WithTranslations];
