import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Navigation } from '../../application/adapters/navigation';
import { RootStack } from './root';
import { LinkingConfiguration } from './LinkingConfiguration';

const NavigationUI = () => {
  return (
    <NavigationContainer ref={Navigation.getInstance()} linking={LinkingConfiguration}>
      <RootStack />
    </NavigationContainer>
  );
};

export { NavigationUI, LinkingConfiguration };
