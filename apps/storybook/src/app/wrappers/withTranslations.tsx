import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Story } from '@storybook/react-native';
import { i18n } from '@clean-rn/ui-mobile';

export const WithTranslations = (Story: Story) => {
  return (
    <I18nextProvider i18n={i18n}>
      <Story />
    </I18nextProvider>
  );
};
