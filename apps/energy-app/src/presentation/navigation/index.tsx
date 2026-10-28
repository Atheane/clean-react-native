import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './RootStack';
import { navigationRef, goToInitRoute } from './navigationRef';
import { LinkingConfiguration } from './LinkingConfiguration';

export const NavigationUI = () => {
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
