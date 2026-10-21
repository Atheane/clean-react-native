import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { LoaderSplashScreen } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const LoaderSplashScreenMeta: ComponentMeta<typeof LoaderSplashScreen> = {
  title: 'Others/Loader',
  component: LoaderSplashScreen,
  args: {},
  decorators: [(Story) => WithStatus(Story, ValidationStatus.PENDING), WithCenterView],
};

export default LoaderSplashScreenMeta;

type LoaderSplashScreenStory = ComponentStory<typeof LoaderSplashScreen>;

export const Static: LoaderSplashScreenStory = () => {
  return <LoaderSplashScreen />;
};
