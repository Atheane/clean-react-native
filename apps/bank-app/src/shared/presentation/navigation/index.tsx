import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { RootStack } from './RootStack';
import { navigationRef } from './navigationRef';
import { LinkingConfiguration } from './LinkingConfiguration';

const NavigationUI = () => {
  const [isReady, setIsReady] = useState(false);

  console.log('NvigationUI isReady', isReady);
  return (
    <NavigationContainer
      ref={navigationRef as any}
      linking={LinkingConfiguration}
      onReady={() => {
        setIsReady(true);
      }}
    >
      <RootStack />
    </NavigationContainer>
  );
};

export { NavigationUI };
