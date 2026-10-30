import React from 'react';
import { ThemeProvider } from '@rneui/themed';
import { theme } from '../theme';

export const WithTheme = (Story: React.ComponentType) => {
  return (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  );
};
