import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { TopBackground, TopDownBackground, ViewBackground } from '@clean-rn/ui-mobile';

const ViewBackgroundMeta: ComponentMeta<typeof ViewBackground> = {
  title: 'Backgrounds/ViewBackground',
  component: ViewBackground,
  argTypes: {},
  args: {
    background: TopDownBackground,
  },
};

export default ViewBackgroundMeta;

type ViewBackgroundStory = ComponentStory<typeof ViewBackground>;

export const TopDown: ViewBackgroundStory = (args) => (
  <ViewBackground {...args} background={TopDownBackground} />
);
export const Top: ViewBackgroundStory = (args) => <ViewBackground {...args} background={TopBackground} />;
