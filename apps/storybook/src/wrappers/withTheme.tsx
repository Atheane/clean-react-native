import React from 'react';
import { ThemeProvider } from '@rneui/themed';
import { theme } from '@clean-rn/ui-mobile';

export const WithTheme = (Story: React.ComponentType) => {
  return (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  );
};
