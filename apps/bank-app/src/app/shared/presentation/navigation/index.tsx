import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { NavigationService } from './navigationService';
import { RootStack } from './root';
import { LinkingConfiguration } from './LinkingConfiguration';

const Navigation = () => {
  return (
    <NavigationContainer ref={NavigationService.getInstance()} linking={LinkingConfiguration}>
      <RootStack />
    </NavigationContainer>
  );
};

export { Navigation, LinkingConfiguration };
