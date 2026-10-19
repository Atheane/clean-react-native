import { NavigationContainer } from '@react-navigation/native';

import { RootStack } from './RootStack';
import { navigationRef, goToInitRoute } from './navigationRef';
import { LinkingConfiguration } from './LinkingConfiguration';
// import { Logger } from '@clean-rn/logger';

const NavigationUI = () => {
  return (
    <NavigationContainer
      ref={navigationRef as any}
      linking={LinkingConfiguration}
      onReady={goToInitRoute}
      // onStateChange={(state) => Logger.getInstance().info('New nav state is', state)}
    >
      <RootStack />
    </NavigationContainer>
  );
};

export { NavigationUI };
