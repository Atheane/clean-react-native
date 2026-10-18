import { NavigationContainer } from '@react-navigation/native';

import { RootStack } from './RootStack';
import { navigationRef, goToInitRoute } from './navigationRef';
import { LinkingConfiguration } from './LinkingConfiguration';

const NavigationUI = () => {
  return (
    <NavigationContainer ref={navigationRef as any} linking={LinkingConfiguration} onReady={goToInitRoute}>
      <RootStack />
    </NavigationContainer>
  );
};

export { NavigationUI };
