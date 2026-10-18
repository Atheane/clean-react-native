import { ComponentStory, ComponentMeta } from '@storybook/react-native';

import { TouchCardText } from '@clean-rn/ui-mobile';
import { WithStatus, ValidationStatus, WithCenterView } from '../../wrappers';

const TouchCardTextMeta: ComponentMeta<typeof TouchCardText> = {
  title: 'Cards/TouchCardText',
  component: TouchCardText,
  argTypes: {
    onPress: { action: 'onPress' },
  },
  args: {
    text: 'Being rewarded by CO2 prime',
  },
  decorators: [(Story) => WithStatus(Story, ValidationStatus.VALIDATED), WithCenterView],
};

export default TouchCardTextMeta;

type TouchCardTextStory = ComponentStory<typeof TouchCardText>;

export const Static: TouchCardTextStory = (args) => <TouchCardText {...args} />;
