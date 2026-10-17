import React from 'react';
import { render } from '@testing-library/react-native';

import PrimaryButton from './primary-button';

describe('PrimaryButton', () => {
  it('should render successfully', () => {
    const { root } = render(< PrimaryButton />);
    expect(root).toBeTruthy();
  });
});
