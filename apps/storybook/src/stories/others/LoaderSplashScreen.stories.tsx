import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { LoaderSplashScreen } from '@clean-rn/ui-mobile';

const LoaderSplashScreenMeta: ComponentMeta<typeof LoaderSplashScreen> = {
  title: 'Others/Loader',
  component: LoaderSplashScreen,
  args: {},
};

export default LoaderSplashScreenMeta;

type LoaderSplashScreenStory = ComponentStory<typeof LoaderSplashScreen>;

export const Static: LoaderSplashScreenStory = () => {
  return <LoaderSplashScreen />;
};
