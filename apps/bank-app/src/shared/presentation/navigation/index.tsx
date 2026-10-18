import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { RootStack } from './root';
import { navigationRef } from './root/RootNavigation';
import { headersOptions } from './headersOptions';
import { LinkingConfiguration } from './LinkingConfiguration';

const NavigationUI = () => {
  return (
    <NavigationContainer ref={navigationRef} linking={LinkingConfiguration}>
      <RootStack />
    </NavigationContainer>
  );
};

export { NavigationUI, LinkingConfiguration, headersOptions, navigationRef };
