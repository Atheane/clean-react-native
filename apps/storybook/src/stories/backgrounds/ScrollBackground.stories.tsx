import { View } from 'react-native';
import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { TopBackground, TopDownBackground, ScrollBackground } from '@clean-rn/ui-mobile';

const ScrollBackgroundMeta: ComponentMeta<typeof ScrollBackground> = {
  title: 'Backgrounds/ScrollBackground',
  component: ScrollBackground,
  argTypes: {},
  args: {
    background: TopDownBackground,
    children: <View />,
    initialScroll: 10,
    window: 1.2,
  },
};

export default ScrollBackgroundMeta;

type ScrollBackgroundStory = ComponentStory<typeof ScrollBackground>;

export const TopDown: ScrollBackgroundStory = (args) => (
  <ScrollBackground {...args} background={TopDownBackground} />
);

export const Top: ScrollBackgroundStory = (args) => <ScrollBackground {...args} background={TopBackground} />;
