import React from 'react';
import { ThemeProvider } from '@rneui/themed';
import { theme } from '@bank/ui-mobile';

export const withTheme = (Story: React.ComponentType) => {
  return (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  );
};
