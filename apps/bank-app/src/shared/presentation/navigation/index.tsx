import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { RootStack } from './RootStack';
import { navigationRef } from './navigationRef';
import { LinkingConfiguration } from './LinkingConfiguration';

const NavigationUI = () => {
  return (
    <NavigationContainer ref={navigationRef} linking={LinkingConfiguration}>
      <RootStack />
    </NavigationContainer>
  );
};

export { NavigationUI };
