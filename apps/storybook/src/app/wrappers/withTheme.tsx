import React from 'react';
import { Story } from '@storybook/react-native';
import { ThemeProvider } from '@rneui/themed';
import { theme } from '@clean-rn/ui-mobile';

export const WithTheme = (Story: Story) => {
  return (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  );
};
